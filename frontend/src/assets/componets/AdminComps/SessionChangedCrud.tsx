import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionChangeData, Id, } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "#common/@enums/models";

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
    }, [api]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
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
        <div>
            <h1>Session Changed Management</h1>

            <div>
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
                    />
                    <input
                        type="number"
                        name="classHourId"
                        placeholder="Class Hour ID"
                        value={formState.classHourId}
                        onChange={handleInputChange}
                    />
                    <select
                        name="day"
                        value={formState.day}
                        onChange={handleInputChange}
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
                    />
                    <input
                        type="date"
                        name="endDate"
                        placeholder="End Date"
                        value={formState.endDate}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedSession ? "Update" : "Create"}</button>
                    {selectedSession && <button onClick={() => setSelectedSession(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Session List</h2>
                {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) &&
                    Array.isArray(sessions.data) && sessions.data.map((session) => {
                        return (
                            <div key={session.id}>
                                <p>
                                    Session ID: {session.sessionId}, Class Hour ID: {session.classHourId}, Day: {session.day}, Start Date: {session.startDate}, End Date: {session.endDate}
                                </p>
                                <button onClick={() => handleEdit(session)}>Edit</button>
                                <button onClick={() => handleDelete({ id: session.id })}>Delete</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default SessionChangedCrud;
