import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { Id, IGTModuleData } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import './CrudsStyles.css';

type IGTModule = IGTModuleData & Id;

const IGTModuleCrud: React.FC = () => {
    const [modules, api] = useApi<IGTModule>(ApiRts.IGT_modules);

    const [selectedModule, setSelectedModule] = useState<IGTModule | null>(null);
    const [formState, setFormState] = useState<IGTModule>({
        id: 0,
        teacherId: 0,
        groupId: 0,
        moduleId: 0,
        weeklyHours: 1,
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: Number(value) }));
    };

    const validateForm = () => {
        const { teacherId, groupId, moduleId, weeklyHours } = formState;
        if (teacherId <= 0 || groupId <= 0 || moduleId <= 0 || weeklyHours <= 0) {
            alert("Todos los campos son obligatorios y deben tener valores válidos.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState)
            .then(() => {
                setFormState({ id: 0, teacherId: 0, groupId: 0, moduleId: 0, weeklyHours: 1 });
                api.getAll();
            })
            .catch((error) => {
                console.error("Error al crear el módulo:", error);
                alert("Hubo un error al crear el módulo. Intenta nuevamente.");
            });
    };

    const handleUpdate = () => {
        if (!selectedModule) return;

        api.put({ id: selectedModule.id, body: formState })
            .then(() => {
                setSelectedModule(null);
                setFormState({ id: 0, teacherId: 0, groupId: 0, moduleId: 0, weeklyHours: 1 });
                api.getAll();
            })
            .catch((error) => {
                console.error("Error al actualizar el módulo:", error);
                alert("Hubo un error al actualizar el módulo. Intenta nuevamente.");
            });
    };

    const handleDelete = (id: Id) => {
        api.delete(id)
            .then(() => api.getAll())
            .catch((error) => {
                console.error("Error al borrar el módulo:", error);
                alert("Hubo un error al borrar el módulo. Intenta nuevamente.");
            });
    };

    const handleEdit = (module: IGTModule) => {
        setSelectedModule(module);
        setFormState(module);
    };

    if (modules.state === FetchState.Loading) return <p>Loading...</p>;
    if (modules.state === FetchState.Error) return <p>Error: {modules.error?.message}</p>;

    return (
        <div className="crud__container">
            <h1 className="crud__title">IGT Module Management</h1>

            <div className="crud__form">
                <h2>{selectedModule ? "Edit Module" : "Create Module"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedModule ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="number"
                        name="teacherId"
                        placeholder="Teacher ID"
                        value={formState.teacherId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="groupId"
                        placeholder="Group ID"
                        value={formState.groupId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="moduleId"
                        placeholder="Module ID"
                        value={formState.moduleId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="weeklyHours"
                        placeholder="Weekly Hours"
                        value={formState.weeklyHours}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedModule ? "Update" : "Create"}
                    </button>
                    {selectedModule && (
                        <button
                            type="button"
                            onClick={() => setSelectedModule(null)}
                            className="crud__button--cancel"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div>
                <h2>Module List</h2>
                <div className="crud__list">
                    {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) &&
                        Array.isArray(modules.data) &&
                        modules.data.map((module) => (
                            <div key={module.id} className="crud__item">
                                <p>
                                    <strong>Teacher ID:</strong> {module.teacherId},{" "}
                                    <strong>Group ID:</strong> {module.groupId},{" "}
                                    <strong>Module ID:</strong> {module.moduleId},{" "}
                                    <strong>Weekly Hours:</strong> {module.weeklyHours}
                                </p>
                                <div className="crud__buttonGroup">
                                    <button
                                        onClick={() => handleEdit(module)}
                                        className="crud__button--edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete({ id: module.id })}
                                        className="crud__button--delete"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default IGTModuleCrud;
