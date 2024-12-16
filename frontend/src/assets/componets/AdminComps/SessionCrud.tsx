import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "../../../../../common/@enums/models/index";
import './CrudsStyles.css';

type Session = SessionData & Id;

const SessionCrud: React.FC = () => {
    const [sessions, api] = useApi<Session>(ApiRts.Session);

    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [formState, setFormState] = useState<Session>({
        id: 0,
        day: WorkDay.Monday,
        classHourId: 0,
        igtModuleId: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { classHourId, igtModuleId, day } = formState;
        if (classHourId <= 0 || igtModuleId <= 0 || !day) {
            alert("Todos los campos son obligatorios y deben ser válidos.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({ id: 0, day: WorkDay.Monday, classHourId: 0, igtModuleId: 0 });
            api.getAll();
        });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedSession) return;
        api.put({ id: selectedSession.id, body: formState }).then(() => {
            setSelectedSession(null);
            setFormState({ id: 0, day: WorkDay.Monday, classHourId: 0, igtModuleId: 0 });
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        });
    };

    const handleEdit = (session: Session) => {
        setSelectedSession(session);
        setFormState(session);
    };

    if (sessions.state === FetchState.Loading) return <p>Loading...</p>;
    if (sessions.state === FetchState.Error) return <p>Error: {sessions.error?.message}</p>;

    useEffect(() => {
        api.getAll();
    }, []);

    return (
        <div className="crud__container">
            <h1 className="crud__title">Session Management</h1>

            <div className="crud__form">
                <h2>{selectedSession ? "Edit Session" : "Create Session"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedSession ? handleUpdate() : handleCreate();
                    }}
                >
                    <select
                        name="day"
                        value={formState.day}
                        onChange={handleInputChange}
                        className="crud__input"
                    >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>

                    <input
                        type="number"
                        name="classHourId"
                        placeholder="Class Hour ID"
                        value={formState.classHourId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="igtModuleId"
                        placeholder="Module ID"
                        value={formState.igtModuleId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedSession ? "Update" : "Create"}
                    </button>
                    {selectedSession && (
                        <button
                            type="button"
                            onClick={() => setSelectedSession(null)}
                            className="crud__button--cancel"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <h2>Session List</h2>
            <div className="crud__list">
                {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) &&
                    Array.isArray(sessions.data) &&
                    sessions.data.map((session) => (
                        <div key={session.id} className="crud__item">
                            <p>
                                Day: {session.day} | Class Hour ID: {session.classHourId} | Module ID: {session.igtModuleId}
                            </p>
                            <div className="crud__buttonGroup">
                                <button
                                    className="crud__button--edit"
                                    onClick={() => handleEdit(session)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="crud__button--delete"
                                    onClick={() => handleDelete({ id: session.id })}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SessionCrud;
