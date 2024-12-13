import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { ClassHourData, Id, SessionHour, } from "#common/@types/models"; 
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { Turn } from "#common/@enums/models";

type ClassHour = ClassHourData & Id; 

const ClassHourCrud: React.FC = () => {
    const [classHours, api] = useApi<ClassHour>(ApiRts.ClassHour);

    const [selectedClassHour, setSelectedClassHour] = useState<ClassHour | null>(null);
    const [formState, setFormState] = useState<ClassHour>({
        id: 0,
        turn: Turn.Morning, 
        sessionHour: 1,     
        start: "",
        end: "",
    });

    useEffect(() => {
        api.getAll();
    }, [api]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTurnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Turn; 
        setFormState((prevState) => ({ ...prevState, turn: value }));
    };

    const handleSessionHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value) as SessionHour; 
        setFormState((prevState) => ({ ...prevState, sessionHour: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, turn: Turn.Morning, sessionHour: 1, start: "", end: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear la clase:", error);
            alert("Hubo un error al crear la clase. Intenta nuevamente.");
        });
    };

    const handleUpdate = () => {
        if (!selectedClassHour) return;

        api.put({ id: selectedClassHour.id, body: formState }).then(() => {
            setSelectedClassHour(null);
            setFormState({ id: 0, turn: Turn.Morning, sessionHour: 1, start: "", end: "" });
            api.getAll(); 
        }).catch((error) => {
            console.error("Error al actualizar la clase:", error);
            alert("Hubo un error al actualizar la clase. Intenta nuevamente.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error al borrar la clase:", error);
            alert("Hubo un error al borrar la clase. Intenta nuevamente.");
        });
    };

    const handleEdit = (classHour: ClassHour) => {
        setSelectedClassHour(classHour);
        setFormState(classHour);
    };

    if (classHours.state === FetchState.Loading) return <p>Loading...</p>;
    if (classHours.state === FetchState.Error) return <p>Error: {classHours.error?.message}</p>;

    return (
        <div>
            <h1>Class Hour Management</h1>

            <div>
                <h2>{selectedClassHour ? "Edit Class Hour" : "Create Class Hour"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedClassHour ? handleUpdate() : handleCreate();
                    }}
                >
                    <select
                        name="turn"
                        value={formState.turn}
                        onChange={handleTurnChange}
                    >
                        <option value={Turn.Morning}>Morning</option>
                        <option value={Turn.Afternoon}>Afternoon</option>
                        <option value={Turn.Evening}>Evening</option>
                    </select>

                    <select
                        name="sessionHour"
                        value={formState.sessionHour}
                        onChange={handleSessionHourChange}
                    >
                        {[1, 2, 3, 4, 5, 6].map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>

                    <input
                        type="time"
                        name="start"
                        placeholder="Start Time"
                        value={formState.start}
                        onChange={handleInputChange}
                    />

                    <input
                        type="time"
                        name="end"
                        placeholder="End Time"
                        value={formState.end}
                        onChange={handleInputChange}
                    />

                    <button type="submit">{selectedClassHour ? "Update" : "Create"}</button>
                    {selectedClassHour && <button onClick={() => setSelectedClassHour(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Class Hour List</h2>
                {(classHours.state === FetchState.Success || classHours.state === FetchState.SuccessMany) &&
                    Array.isArray(classHours.data) && classHours.data.map((classHour) => (
                        <div key={classHour.id}>
                            <p>
                                {classHour.turn} - {classHour.sessionHour} - {classHour.start} to {classHour.end}
                            </p>
                            <button onClick={() => handleEdit(classHour)}>Edit</button>
                            <button onClick={() => handleDelete({ id: classHour.id })}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ClassHourCrud;