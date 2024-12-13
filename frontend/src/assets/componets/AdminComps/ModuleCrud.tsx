import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { ModuleData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

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

    // Validación de campos antes de hacer el POST o PUT
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
            api.getAll(); // Refrescamos la lista de módulos
        }).catch((error) => {
            console.error("Error al crear el módulo:", error);
            alert("Hubo un error al crear el módulo. Intenta nuevamente.");
        });
    };

    const handleUpdate = () => {
        if (!selectedModule) return;

        api.put({ id: selectedModule.id, body: formState }).then(() => {
            setSelectedModule(null);
            setFormState({ id: 0, name: "" });
            api.getAll(); // Refrescamos la lista de módulos
        }).catch((error) => {
            console.error("Error al actualizar el módulo:", error);
            alert("Hubo un error al actualizar el módulo. Intenta nuevamente.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll(); // Refrescamos la lista de módulos
        }).catch((error) => {
            console.error("Error al borrar el módulo:", error);
            alert("Hubo un error al borrar el módulo. Intenta nuevamente.");
        });
    };

    const handleEdit = (module: Module) => {
        setSelectedModule(module);
        setFormState(module);
    };

    if (modules.state === FetchState.Loading) return <p>Loading...</p>;
    if (modules.state === FetchState.Error) return <p>Error: {modules.error?.message}</p>;

    return (
        <div>
            <h1>Module Management</h1>

            <div>
                <h2>{selectedModule ? "Edit Module" : "Create Module"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedModule ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Module Name"
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedModule ? "Update" : "Create"}</button>
                    {selectedModule && <button type="button" onClick={() => setSelectedModule(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Module List</h2>
                {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) &&
                    Array.isArray(modules.data) &&
                    modules.data.map((module) => (
                        <div key={module.id}>
                            <p>{module.name}</p>
                            <button onClick={() => handleEdit(module)}>Edit</button>
                            <button onClick={() => handleDelete({ id: module.id })}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ModuleCrud;
