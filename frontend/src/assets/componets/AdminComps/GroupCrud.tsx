import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { GroupData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

type Group = GroupData & Id;

const GroupCrud: React.FC = () => {
    const [groups, api] = useApi<Group>(ApiRts.Groups);

    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [formState, setFormState] = useState<Group>({ id: 0, name: "" });

    useEffect(() => {
        api.getAll();
    }, []);

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
        if (!selectedGroup) return;
        api.put({ id: selectedGroup.id, body: formState }).then(() => {
            setSelectedGroup(null);
            setFormState({ id: 0, name: "" });
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        });
    };

    const handleEdit = (group: Group) => {
        setSelectedGroup(group);
        setFormState(group);
    };

    if (groups.state === FetchState.Loading) return <p>Loading...</p>;
    if (groups.state === FetchState.Error) return <p>Error: {groups.error?.message}</p>;

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
                {(groups.state === FetchState.Success || groups.state === FetchState.SuccessMany) &&
                    Array.isArray(groups.data) &&
                    groups.data.map((group) => (
                        <div key={group.id}>
                            <p>{group.name}</p>
                            <button onClick={() => handleEdit(group)}>Edit</button>
                            <button onClick={() => handleDelete({ id: group.id })}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default GroupCrud;
