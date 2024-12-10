import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { GroupData } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

const GroupCrud: React.FC = () => {
    const [groups, api] = useApi<GroupData>(ApiRts.Groups);

    const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
    const [formState, setFormState] = useState<Omit<GroupData, "id">>({
        name: "",
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ name: "" });
            api.getAll();
        });
    };

    const handleUpdate = () => {
        if (!selectedGroup || selectedGroup.id === undefined) return;
        api.put({ id: selectedGroup.id, body: formState }).then(() => {
            setSelectedGroup(null);
            setFormState({ name: "" });
            api.getAll();
        });
    };

    const handleDelete = (id: number) => {
        api.delete(id).then(() => {
            api.getAll();
        });
    };

    const handleEdit = (group: GroupData) => {
        setSelectedGroup(group);
        setFormState({ name: group.name });
    };

    if (groups.state === FetchState.Loading) return <p>Loading...</p>;
    if (groups.state === FetchState.Error) return <p>Error: {groups.error?.message}</p>;

    // Verificamos si `groups.data` está disponible y es un array
    const groupList = groups.state === FetchState.Success || groups.state === FetchState.SuccessMany
        ? (
            Array.isArray(groups.data)
                ? groups.data.map((group: GroupData) => (
                    <div key={group.id ?? Math.random()}>
                        <p>{group.name}</p>
                        <button onClick={() => handleEdit(group)}>Edit</button>
                        {group.id !== undefined && (
                            <button onClick={() => handleDelete(group.id)}>Delete</button>
                        )}
                    </div>
                ))
                : <p>No groups available or error occurred.</p>
        )
        : null;

    return (
        <div>
            <h1>Group Management</h1>

            <div>
                <h2>{selectedGroup ? "Edit Group" : "Create Group"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedGroup ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Group Name"
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedGroup ? "Update" : "Create"}</button>
                    {selectedGroup && <button onClick={() => setSelectedGroup(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>Group List</h2>
                {groupList || <p>No groups found</p>}
            </div>
        </div>
    );
};

export default GroupCrud;
