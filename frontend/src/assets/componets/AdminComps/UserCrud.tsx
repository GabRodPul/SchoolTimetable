import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { UserData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

const UserCrud: React.FC = () => {
    const [users, api] = useApi<UserData>(ApiRts.Users);

    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [formState, setFormState] = useState<UserData>({ id: 0, name: "", email: "", role: "" });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, name: "", email: "", role: "" });
            api.getAll();
        });
    };

    const handleUpdate = () => {
        if (!selectedUser) return;
        api.put({ id: selectedUser.id, body: formState }).then(() => {
            setSelectedUser(null);
            setFormState({ id: 0, name: "", email: "", role: "" });
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        });
    };

    const handleEdit = (user: UserData) => {
        setSelectedUser(user);
        setFormState(user);
    };

    if (users.state === FetchState.Loading) return <p>Loading...</p>;
    if (users.state === FetchState.Error) return <p>Error: {users.error?.message}</p>;

    return (
        <div>
            <h1>User Management</h1>

            <div>
                <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        selectedUser ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formState.role}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedUser ? "Update" : "Create"}</button>
                    {selectedUser && <button onClick={() => setSelectedUser(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>User List</h2>
                {(users.state === FetchState.Success || users.state === FetchState.SuccessMany) && users.data?.map((user: UserData) => (
                    <div key={user.id}>
                        <p>
                            {user.name} ({user.email}) - {user.role}
                        </p>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default UserCrud;
