import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { WarningData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

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

    // Validación de campos antes de hacer el POST o PUT

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

    if (warnings.state === FetchState.Loading) return <p>Loading...</p>;
    if (warnings.state === FetchState.Error) return <p>Error: {warnings.error?.message}</p>;

    return (
        <div>
            <h1>Warning Management</h1>

            <div>
                <h2>{selectedWarning ? "Edit Warning" : "Create Warning"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedWarning ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="number"
                        name="teacherId"
                        placeholder="Teacher ID"
                        value={formState.teacherId}
                        onChange={handleInputChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formState.description}
                        onChange={handleInputChange}
                    />

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

                    <input
                        type="time"
                        name="startHour"
                        placeholder="Start Hour"
                        value={formState.startHour}
                        onChange={handleInputChange}
                    />

                    <input
                        type="time"
                        name="endHour"
                        placeholder="End Hour"
                        value={formState.endHour}
                        onChange={handleInputChange}
                    />

                    <button type="submit">{selectedWarning ? "Update" : "Create"}</button>
                    {selectedWarning && <button onClick={() => setSelectedWarning(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Warning List</h2>
                {(warnings.state === FetchState.Success || warnings.state === FetchState.SuccessMany) &&
                    Array.isArray(warnings.data) && warnings.data.map((warning) => (
                        <div key={warning.id}>
                            <p>
                                Teacher ID: {warning.teacherId}, Description: {warning.description}, Start Date: {warning.startDate}, End Date: {warning.endDate},
                                Time: {warning.startHour} to {warning.endHour}
                            </p>
                            <button onClick={() => handleEdit(warning)}>Edit</button>
                            <button onClick={() => handleDelete({ id: warning.id })}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WarningCrud;
