import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { UserData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import './CrudsStyles.css';

type User = UserData & Id;

const UserCrud: React.FC = () => {
    const [users, api] = useApi<User>(ApiRts.Users);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formState, setFormState] = useState<User>({
        id: 0,
        name: "",
        email: "",
        role: "",
        password: "",
        phoneNumber: ""
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formState;
        if (!name || !email || !password || !phoneNumber) {
            alert("All fields are required.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState).then(() => {
            setFormState({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error creating user:", error);
            alert("There was an error creating the user. Please try again.");
        });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedUser) return;
        api.put({ id: selectedUser.id, body: formState }).then(() => {
            setSelectedUser(null);
            setFormState({ id: 0, name: "", email: "", role: "", password: "", phoneNumber: "" });
            api.getAll();
        }).catch((error) => {
            console.error("Error updating user:", error);
            alert("There was an error updating the user. Please try again.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error deleting user:", error);
            alert("There was an error deleting the user. Please try again.");
        });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setFormState(user);
    };

    return (
        <div className="crud__container">
            <h1 className="crud__title">Formulario de Usuarios</h1>

            <div className="crud__form">
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
                        className="crud__input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formState.phoneNumber}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedUser ? "Update" : "Create"}
                    </button>
                    {selectedUser && (
                        <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="crud__button--cancel"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            
            <h2>Listado de Usuarios</h2>
            <div className="crud__list">
                
                {(users.state === FetchState.Success || users.state === FetchState.SuccessMany) &&
                    Array.isArray(users.data) &&
                    users.data.map((user) => {
                        const userWithId = user as User;
                        return (
                            <div key={userWithId.id} className="crud__item">
                                <p>
                                    {userWithId.name} ({userWithId.email}) - {userWithId.role}
                                </p>
                                <div className="crud__buttonGroup">
                                    <button className="crud__button--edit" onClick={() => handleEdit(userWithId)}>Edit</button>
                                    <button className="crud__button--delete" onClick={() => handleDelete({ id: userWithId.id })}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default UserCrud;
