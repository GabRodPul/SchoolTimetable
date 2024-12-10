import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { ModuleData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

const ModuleCrud: React.FC = () => {
    const [modules, api] = useApi<ModuleData>(ApiRts.Modules); 

    const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
    const [formState, setFormState] = useState<ModuleData>({ id: 0, name: "" });

    useEffect(() => {
        api.getAll();
    }, [api]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, name: "" }); 
            api.getAll(); 
        });
    };

    const handleUpdate = () => {
        if (!selectedModule) return;
        api.put({ id: selectedModule.id, body: formState }).then(() => {
            setSelectedModule(null); 
            setFormState({ id: 0, name: "" }); 
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll(); 
        });
    };

    const handleEdit = (module: ModuleData) => {
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
                    {selectedModule && <button onClick={() => setSelectedModule(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Module List</h2>
                {(modules.state === FetchState.Success || modules.state === FetchState.SuccessMany) && modules.data?.map((module: ModuleData) => (
                    <div key={module.id}>
                        <p>{module.name}</p>
                        <button onClick={() => handleEdit(module)}>Edit</button>
                        {module.id !== undefined && (
                            <button onClick={() => handleDelete(module.id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModuleCrud;
