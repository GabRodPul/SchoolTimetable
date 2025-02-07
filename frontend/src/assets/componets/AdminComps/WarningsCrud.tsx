import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { WarningData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import './CrudsStyles.css';

type Warning = WarningData & Id;

const WarningCrud: React.FC = () => {
    const [warnings, api] = useApi<Warning>(ApiRts.Warnings);

    const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
    const [formState, setFormState] = useState<Warning>({
        id: 0,
        teacherId: 0,
        description: "",
        startDate: "",
        endDate: "",
        startHour: "",
        endHour: "",
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { teacherId, description, startDate, endDate, startHour, endHour } = formState;
        if (teacherId <= 0 || !description || !startDate || !endDate || !startHour || !endHour) {
            alert("Todos los campos son obligatorios y deben ser válidos.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({
                id: 0,
                teacherId: 0,
                description: "",
                startDate: "",
                endDate: "",
                startHour: "",
                endHour: "",
            });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear la advertencia:", error);
            alert("Hubo un error al crear la advertencia. Intenta nuevamente.");
        });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedWarning) return;

        api.put({ id: selectedWarning.id, body: formState }).then(() => {
            setSelectedWarning(null);
            setFormState({
                id: 0,
                teacherId: 0,
                description: "",
                startDate: "",
                endDate: "",
                startHour: "",
                endHour: "",
            });
            api.getAll();
        }).catch((error) => {
            console.error("Error al actualizar la advertencia:", error);
            alert("Hubo un error al actualizar la advertencia. Intenta nuevamente.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error al borrar la advertencia:", error);
            alert("Hubo un error al borrar la advertencia. Intenta nuevamente.");
        });
    };

    const handleEdit = (warning: Warning) => {
        setSelectedWarning(warning);
        setFormState(warning);
    };

    return (
        <div className="crud__container">
            <h1 className="crud__title">Formulario de Avisos</h1>

            <div className="crud__form">
                <h2>{selectedWarning ? "Editar" : "Crear"} Aviso</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedWarning ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="number"
                        name="teacherId"
                        placeholder="ID Profe"
                        value={formState.teacherId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formState.description}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <input
                        type="date"
                        name="startDate"
                        placeholder="Fecha Inicio"
                        value={formState.startDate}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <input
                        type="date"
                        name="endDate"
                        placeholder="Fecha Fin"
                        value={formState.endDate}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <input
                        type="time"
                        name="startHour"
                        placeholder="Hora de Inicio"
                        value={formState.startHour}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <input
                        type="time"
                        name="endHour"
                        placeholder="Hora de Finalización"
                        value={formState.endHour}
                        onChange={handleInputChange}
                        className="crud__input"
                    />

                    <button type="submit" className="crud__button">
                        {selectedWarning ? "Actualizar" : "Crear"}
                    </button>
                    {selectedWarning && (
                        <button
                            type="button"
                            onClick={() => setSelectedWarning(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <h2>Listado de Avisos</h2>
            <div className="crud__list">
                {(warnings.state === FetchState.Success || warnings.state === FetchState.SuccessMany) &&
                    Array.isArray(warnings.data) &&
                    warnings.data.map((warning) => (
                        <div key={warning.id} className="crud__item">
                            <p>
                                ID del Profesor: {warning.teacherId}, Descripción: {warning.description}, Fecha: {warning.startDate} - {warning.endDate},
                                Horario: {warning.startHour} - {warning.endHour}
                            </p>
                            <div className="crud__buttonGroup">
                                <button
                                    className="crud__button--edit"
                                    onClick={() => handleEdit(warning)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="crud__button--delete"
                                    onClick={() => handleDelete({ id: warning.id })}
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

export default WarningCrud;
