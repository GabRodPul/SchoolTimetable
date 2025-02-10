import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { UserData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { useScrollAnimation } from "./animationFade";
import './CrudsStyles.css';

type User = UserData & Id;

const UserCrud: React.FC = () => {
    const ref = useScrollAnimation();
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
            alert("Todos los campos son obligatorios.");
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
            alert("Ocurrió un error al crear usuario. Por favor, inténtelo de nuevo.");
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
            alert("Ocurrió un error al actualizar usuario. Por favor, inténtelo de nuevo.");
        });
    };

    const handleDelete = (id: Id) => {
        api.delete(id).then(() => {
            api.getAll();
        }).catch((error) => {
            console.error("Error deleting user:", error);
            alert("Ocurrió un error al eliminar usuario. Por favor, inténtelo de nuevo.");
        });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setFormState(user);
    };

    return (
        <div className="crud__container">
            <h1 ref={ref} className="crud__title animation">Formulario de Usuarios</h1>

            <div ref={ref} className="crud__form animation">
                <h2>{selectedUser ? "Editar" : "Crear"} Usuario</h2>
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
                        placeholder="Número de Télefono"
                        value={formState.phoneNumber}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedUser ? "Editar" : "Crear"}
                    </button>
                    {selectedUser && (
                        <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <h2 className="crud__list_title animation">Listado de Usuarios</h2>
            <div className="crud__list animation">

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
                                    <button className="crud__button--edit" onClick={() => handleEdit(userWithId)}>Editar</button>
                                    <button className="crud__button--delete" onClick={() => handleDelete({ id: userWithId.id })}>Eliminar</button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default UserCrud;
