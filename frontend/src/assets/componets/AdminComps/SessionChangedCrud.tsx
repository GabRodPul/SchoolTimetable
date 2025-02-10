import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionChangeData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "#common/@enums/models";
import './CrudsStyles.css';
import { translate } from "#src/_translation";

type SessionChanged = SessionChangeData & Id;

const SessionChangedCrud: React.FC = () => {
    const [sessions, api] = useApi<SessionChanged>(ApiRts.SessionChanged);

    const [selectedSession, setSelectedSession] = useState<SessionChanged | null>(null);
    const [formState, setFormState] = useState<SessionChanged>({
        id: 1,
        sessionId: 2,
        classHourId: 2,
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
            console.log("✅ Sesión creada, llamando a getAll()"); // 🔍 Depuración
            api.getAll();
        }).catch((error) => {
            console.error("❌ Error al crear la sesión:", error);
        });
    };
    
    

    const handleUpdate = () => {
        if (!validateForm()) return;
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

    if (sessions.state === FetchState.Loading) return <p>Cargando...</p>;
    if (sessions.state === FetchState.Error) return <p>Error: {sessions.error?.message}</p>;

    return (
        <div className="crud__container">
            <h1 className="crud__title">Gestión de Cambios de Sesión</h1>

            <div className="crud__form">
                <h2>{selectedSession ? "Editar" : "Crear"} Cambio de Sesión</h2>
                <form
                    data-testid="session-change-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedSession ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="number"
                        name="sessionId"
                        placeholder="ID Sesión"
                        value={formState.sessionId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="classHourId"
                        placeholder="ID Hora de Clase"
                        value={formState.classHourId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <select
                        name="day"
                        value={formState.day}
                        onChange={handleInputChange}
                        className="crud__input"
                        aria-label="WorkDay"
                    >
                        {Object.values(WorkDay).map(day => (
                            <option key={day} value={day}>{translate.workDay(day)}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="startDate"
                        placeholder="Fecha de Inicio"
                        value={formState.startDate}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="date"
                        name="endDate"
                        placeholder="Fecha de Finalización"
                        value={formState.endDate}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button" data-testid="ButtonTest-edit" >
                        {selectedSession ? "Editar cambio" : "Crear cambio"}
                    </button>
                    {selectedSession && (
                        <button
                            type="button"
                            onClick={() => setSelectedSession(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div>
                <h2>Listado de Cambios de Sesión</h2>
                <div className="crud__list">
                    {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) &&
                        Array.isArray(sessions.data) && sessions.data.map((session) => {
                            return (
                                <div key={session.id} className="crud__item">
                                    <p>
                                        ID Sesión: {session.sessionId}, ID Hora de Clase: {session.classHourId}, Día: {translate.workDay(session.day)}, Fecha de Inicio: {session.startDate}, Fecha de Finalización: {session.endDate}
                                    </p>
                                    <div className="crud__buttonGroup">
                                        <button
                                            className="crud__button--edit"
                                            onClick={() => handleEdit(session)}
                                            data-testid="button-edit-list"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="crud__button--delete"
                                            onClick={() => handleDelete({ id: session.id })}
                                        >
                                            Eliminar
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
