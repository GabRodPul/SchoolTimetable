import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { SessionData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { WorkDay } from "../../../../../common/@enums/models/index";
import './CrudsStyles.css';
import { translate } from "../../../_translation";

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

    if (sessions.state === FetchState.Loading) return <p>Cargando...</p>;
    if (sessions.state === FetchState.Error) return <p>Error: {sessions.error?.message}</p>;

    useEffect(() => {
        api.getAll();
    }, []);

    return (
        <div className="crud__container">
            <h1 className="crud__title">Gestión de Sesiones</h1>

            <div className="crud__form">
                <h2>{selectedSession ? "Editar" : "Crear"} Sesión</h2>
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
                        <option value="MONDAY">Lunes</option>
                        <option value="TUESDAY">Martes</option>
                        <option value="WEDNESDAY">Miércoles</option>
                        <option value="THURSDAY">Jueves</option>
                        <option value="FRIDAY">Viernes</option>
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
                        {selectedSession ? "Editar" : "Crear"}
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

            <h2>Listado de Sesiones</h2>
            <div className="crud__list">
                {(sessions.state === FetchState.Success || sessions.state === FetchState.SuccessMany) &&
                    Array.isArray(sessions.data) &&
                    sessions.data.map((session) => (
                        <div key={session.id} className="crud__item">
                            <p>
                                Día: {translate.workDay(session.day)} | ID Hora de Clase: {session.classHourId} | ID Módulo: {session.igtModuleId}
                            </p>
                            <div className="crud__buttonGroup">
                                <button
                                    className="crud__button--edit"
                                    onClick={() => handleEdit(session)}
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
                    ))}
            </div>
        </div>
    );
};

export default SessionCrud;
