import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { Id, IGTModuleData } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

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
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // Validación de campos antes de hacer el POST o PUT
    const validateForm = () => {
        const { teacherId, groupId, moduleId, weeklyHours } = formState;
        if (teacherId <= 0 || groupId <= 0 || moduleId <= 0 || weeklyHours <= 0) {
            alert("Todos los campos son obligatorios y deben ser una ID adecuada.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        console.log("Enviando formState:", formState);
        api.post(formState).then(() => {
            setFormState({ id: 0, teacherId: 0, groupId: 0, moduleId: 0, weeklyHours: 1 });
            api.getAll();
        }).catch((error) => {
            console.error("Error al crear el módulo:", error);
            alert("Hubo un error al crear el módulo. Intenta nuevamente.");
        });
    };

    const handleUpdate = () => {
        if (!selectedModule) return;

        api.put({ id: selectedModule.id, body: formState }).then(() => {
            setSelectedModule(null);
            setFormState({ id: 0, teacherId: 0, groupId: 0, moduleId: 0, weeklyHours: 1 });
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

    const handleEdit = (module: IGTModule) => {
        setSelectedModule(module);
        setFormState(module);
    };

    if (modules.state === FetchState.Loading) return <p>Loading...</p>;
    if (modules.state === FetchState.Error) return <p>Error: {modules.error?.message}</p>;

    return (
        <div>
            <h1>IGT Module Management</h1>

            <div>
                <h2>{selectedModule ? "Edit Module" : "Create Module"}</h2>
                <form
                    onSubmit={e => {
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
                    />
                    <input
                        type="number"
                        name="groupId"
                        placeholder="Group ID"
                        value={formState.groupId}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="moduleId"
                        placeholder="Module ID"
                        value={formState.moduleId}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="weeklyHours"
                        placeholder="Weekly Hours"
                        value={formState.weeklyHours}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedModule ? "Update" : "Create"}</button>
                    {selectedModule && <button type="button" onClick={() => setSelectedModule(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Module List</h2>
                {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) &&
                    Array.isArray(modules.data) && modules.data.map((module) => {
                        return (
                            <div key={module.id}>
                                <p>
                                    Teacher ID: {module.teacherId}, Group ID: {module.groupId}, Module ID: {module.moduleId}, Weekly Hours: {module.weeklyHours}
                                </p>
                                <button onClick={() => handleEdit(module)}>Edit</button>
                                <button onClick={() => handleDelete({ id: module.id })}>Delete</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default IGTModuleCrud;
