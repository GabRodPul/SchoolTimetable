import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { UserData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";

type User = UserData & Id;
const UserCrud: React.FC = () => {
    const [users, api] = useApi<User>(ApiRts.Users);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formState, setFormState] = useState<User>({ id: 0, teacherId: "", name: "", email: "", role: "", password: "", phoneNumber: "" });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" });
            api.getAll();
        });
    };

    const handleUpdate = () => {
        if (!selectedUser) return;
        api.put({ id: selectedUser.id, body: formState }).then(() => {
            setSelectedUser(null);
            setFormState({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" });
            api.getAll();
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        });
    };

    const handleEdit = (user: User) => {
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
                        placeholder="Nombre"
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
                        name="password"
                        placeholder="Contraseña"
                        value={formState.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Teléfono"
                        value={formState.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <button type="submit">{selectedUser ? "Update" : "Create"}</button>
                    {selectedUser && <button onClick={() => setSelectedUser(null)}>Cancel</button>}
                </form>
            </div>

            <div>
                <h2>User List</h2>
                {(users.state === FetchState.Success || users.state === FetchState.SuccessMany) &&
                    Array.isArray(users.data) && users.data.map((user) => {
                        const userWithId = user as User;
                        return (
                            <div key={userWithId.id}>
                                <p>
                                    {userWithId.name} ({userWithId.email}) - {userWithId.role}
                                </p>
                                <button onClick={() => handleEdit(userWithId)}>Edit</button>
                                <button onClick={() => handleDelete({ id: userWithId.id })}>Delete</button> 
                            </div>
                        );
                    })
                }
            </div>


        </div>
    );
};

export default UserCrud;
