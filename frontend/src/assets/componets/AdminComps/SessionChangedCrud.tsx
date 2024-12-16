import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionChangeData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "#common/@enums/models";
import './CrudsStyles.css';

type SessionChanged = SessionChangeData & Id;

const SessionChangedCrud: React.FC = () => {
    const [sessions, api] = useApi<SessionChanged>(ApiRts.SessionChanged);

    const [selectedSession, setSelectedSession] = useState<SessionChanged | null>(null);
    const [formState, setFormState] = useState<SessionChanged>({
        id: 0,
        sessionId: 0,
        classHourId: 0,
        day: WorkDay.Monday,
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { sessionId, classHourId, day, startDate, endDate } = formState;
        if (sessionId <= 0 || classHourId <= 0 || !day || !startDate || !endDate) {
            alert("Todos los campos son obligatorios y deben ser válidos.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({ id: 0, sessionId: 0, classHourId: 0, day: WorkDay.Monday, startDate: "", endDate: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear la sesión cambiada:", error);
        });
    };

    const handleUpdate = () => {
        if (!selectedSession) return;
        api.put({ id: selectedSession.id, body: formState }).then(() => {
            setSelectedSession(null);
            setFormState({ id: 0, sessionId: 0, classHourId: 0, day: WorkDay.Monday, startDate: "", endDate: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error al actualizar la sesión cambiada:", error);
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error al borrar la sesión cambiada:", error);
        });
    };

    const handleEdit = (session: SessionChanged) => {
        setSelectedSession(session);
        setFormState(session);
    };

    if (sessions.state === FetchState.Loading) return <p>Loading...</p>;
    if (sessions.state === FetchState.Error) return <p>Error: {sessions.error?.message}</p>;

    return (
        <div className="crud__container">
            <h1 className="crud__title">Session Changed Management</h1>

            <div className="crud__form">
                <h2>{selectedSession ? "Edit Session" : "Create Session"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedSession ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="number"
                        name="sessionId"
                        placeholder="Session ID"
                        value={formState.sessionId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="classHourId"
                        placeholder="Class Hour ID"
                        value={formState.classHourId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <select
                        name="day"
                        value={formState.day}
                        onChange={handleInputChange}
                        className="crud__input"
                    >
                        {Object.values(WorkDay).map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="startDate"
                        placeholder="Start Date"
                        value={formState.startDate}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="date"
                        name="endDate"
                        placeholder="End Date"
                        value={formState.endDate}
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

            <div>
                <h2>Session List</h2>
                <div className="crud__list">
                    {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) &&
                        Array.isArray(sessions.data) && sessions.data.map((session) => {
                            return (
                                <div key={session.id} className="crud__item">
                                    <p>
                                        Session ID: {session.sessionId}, Class Hour ID: {session.classHourId}, Day: {session.day}, Start Date: {session.startDate}, End Date: {session.endDate}
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
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default SessionChangedCrud;
