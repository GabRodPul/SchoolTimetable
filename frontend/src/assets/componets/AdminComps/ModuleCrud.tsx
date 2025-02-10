import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { ModuleData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import './CrudsStyles.css';

type Module = ModuleData & Id;

const ModuleCrud: React.FC = () => {
    const [modules, api] = useApi<Module>(ApiRts.Modules);

    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [formState, setFormState] = useState<Module>({ id: 0, name: "" });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { name } = formState;
        if (!name) {
            alert("El nombre del módulo es obligatorio.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({ id: 0, name: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear el módulo:", error);
            alert("Hubo un error al crear el módulo. Intenta nuevamente.");
        });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedModule) return;
        api.put({ id: selectedModule.id, body: formState }).then(() => {
            setSelectedModule(null);
            setFormState({ id: 0, name: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error al actualizar el módulo:", error);
            alert("Hubo un error al actualizar el módulo. Intenta nuevamente.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error al borrar el módulo:", error);
            alert("Hubo un error al borrar el módulo. Intenta nuevamente.");
        });
    };

    const handleEdit = (module: Module) => {
        setSelectedModule(module);
        setFormState(module);
    };

    if (modules.state === FetchState.Loading) return <p>Cargando...</p>;
    if (modules.state === FetchState.Error) return <p>Error: {modules.error?.message}</p>;

    return (
        <div className="crud__container animation">
            <h1 className="crud__title animation">Gestión de Módulos</h1>

            <div className="crud__form">
                <h2>{selectedModule ? "Editar" : "Crear"} Módulo</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedModule ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Módulo"
                        value={formState.name}
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
                <h2 className="crud__list_title animation">Listado de Módulos</h2>
                <div className="crud__list animation">
                    {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) &&
                        Array.isArray(modules.data) &&
                        modules.data.map((module) => (
                            <div key={module.id} className="crud__item">
                                <p>{module.name}</p>
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

export default ModuleCrud;
