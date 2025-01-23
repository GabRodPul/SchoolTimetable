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

    if (modules.state === FetchState.Loading) return <p>Cargando...</p>;
    if (modules.state === FetchState.Error) return <p>Error: {modules.error?.message}</p>;

    return (
        <div className="crud__container">
            <h1 className="crud__title">Gestión de Módulos IGP</h1>

            <div className="crud__form">
                <h2>{selectedModule ? "Editar" : "Crear"} Módulo IGP</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedModule ? handleUpdate() : handleCreate();
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
                    <input
                        type="number"
                        name="groupId"
                        placeholder="ID Grupo"
                        value={formState.groupId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="moduleId"
                        placeholder="ID Módulo"
                        value={formState.moduleId}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="number"
                        name="weeklyHours"
                        placeholder="Horas Semanales"
                        value={formState.weeklyHours}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedModule ? "Editar" : "Crear"}
                    </button>
                    {selectedModule && (
                        <button
                            type="button"
                            onClick={() => setSelectedModule(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div>
                <h2>Listado de Módulos IGP</h2>
                <div className="crud__list">
                    {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) &&
                        Array.isArray(modules.data) &&
                        modules.data.map((module) => (
                            <div key={module.id} className="crud__item">
                                <p>
                                    <strong>ID Profe:</strong> {module.teacherId},{" "}
                                    <strong>ID Grupo:</strong> {module.groupId},{" "}
                                    <strong>ID Módulo:</strong> {module.moduleId},{" "}
                                    <strong>Horas Semanales:</strong> {module.weeklyHours}
                                </p>
                                <div className="crud__buttonGroup">
                                    <button
                                        onClick={() => handleEdit(module)}
                                        className="crud__button--edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete({ id: module.id })}
                                        className="crud__button--delete"
                                    >
                                        Eliminar
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
