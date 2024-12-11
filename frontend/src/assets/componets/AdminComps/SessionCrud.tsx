import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "../../../../../common/@enums/models/index";

const SessionCrud: React.FC = () => {
    const [sessions, api] = useApi<SessionData>(ApiRts.Sessions); // API para interactuar con el backend

    const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
    const [formState, setFormState] = useState<SessionData>({
        id: 0,
        day: WorkDay.Monday, // Puedes cambiar esto dependiendo de tus datos predeterminados
        classHourId: 0,
        igtModuleId: 0
    });

    useEffect(() => {
        api.getAll();
    }, [api]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, day: "Monday", classHourId: 0, igtModuleId: 0 }); 
            api.getAll(); 
        });
    };

    const handleUpdate = () => {
        if (!selectedSession) return;
        api.put({ id: selectedSession.id, body: formState }).then(() => {
            setSelectedSession(null);
            setFormState({ id: 0, day: "Monday", classHourId: 0, igtModuleId: 0 });
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll(); 
        });
    };

    const handleEdit = (session: SessionData) => {
        setSelectedSession(session); 
        setFormState(session);
    };

    if (sessions.state === FetchState.Loading) return <p>Loading...</p>;
    if (sessions.state === FetchState.Error) return <p>Error: {sessions.error?.message}</p>;

    return (
        <div>
            <h1>Session Management</h1>

            <div>
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
                    />
                    <input
                        type="number"
                        name="igtModuleId"
                        placeholder="Module ID"
                        value={formState.igtModuleId}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedSession ? "Update" : "Create"}</button>
                    {selectedSession && <button onClick={() => setSelectedSession(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Session List</h2>
                {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) && sessions.data?.map((session: SessionData) => (
                    <div key={session.id}>
                        <p>
                            Day: {session.day} | Class Hour ID: {session.classHourId} | Module ID: {session.igtModuleId}
                        </p>
                        <button onClick={() => handleEdit(session)}>Edit</button>
                        {session.id !== undefined && (
                            <button onClick={() => handleDelete(session.id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionCrud;