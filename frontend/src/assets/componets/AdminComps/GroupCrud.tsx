import React, { useEffect, useState } from "react";
import { useApi } from "../../../api/ApiContext";
import { GroupData, Id } from "#common/@types/models";
import { FetchState } from "../../../types/api";
import { ApiRts } from "#common/@enums/http";
import { useScrollAnimation } from "./animationFade";
import './CrudsStyles.css';

type Group = GroupData & Id;

const GroupCrud: React.FC = () => {
    const ref = useScrollAnimation();
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

    const validateForm = () => {
        const { name } = formState;
        if (!name.trim()) {
            alert("El nombre del grupo es obligatorio.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState)
            .then(() => {
                setFormState({ id: 0, name: "" });
                api.getAll();
            })
            .catch((error) => {
                console.error("Error al crear el grupo:", error);
                alert("Hubo un error al crear el grupo. Intenta nuevamente.");
            });
    };

    const handleUpdate = () => {
        if (!validateForm()) return;
        if (!selectedGroup) return;
        api.put({ id: selectedGroup.id, body: formState })
            .then(() => {
                setSelectedGroup(null);
                setFormState({ id: 0, name: "" });
                api.getAll();
            })
            .catch((error) => {
                console.error("Error al actualizar el grupo:", error);
                alert("Hubo un error al actualizar el grupo. Intenta nuevamente.");
            });
    };

    const handleDelete = (id: Id) => {
        api.delete(id)
            .then(() => api.getAll())
            .catch((error) => {
                console.error("Error al borrar el grupo:", error);
                alert("Hubo un error al borrar el grupo. Intenta nuevamente.");
            });
    };

    const handleEdit = (group: Group) => {
        setSelectedGroup(group);
        setFormState(group);
    };

    if (groups.state === FetchState.Loading) return <p>Cargando...</p>;
    if (groups.state === FetchState.Error) return <p>Error: {groups.error?.message}</p>;

    return (
        <div ref={ref} className="crud__container animation">
            <h1 className="crud__title">Gestión de Grupos</h1>

            <div className="crud__form">
                <h2>{selectedGroup ? "Editar Grupo" : "Crear Grupo"}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        selectedGroup ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Grupo"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="crud__input"
                    />
                    <button type="submit" className="crud__button">
                        {selectedGroup ? "Editar" : "Crear"}
                    </button>
                    {selectedGroup && (
                        <button
                            type="button"
                            onClick={() => setSelectedGroup(null)}
                            className="crud__button--cancel"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div>
                <h2 className="crud__list_title">Listado de Grupos</h2>
                <div className="crud__list">
                    {(groups.state === FetchState.Success || groups.state === FetchState.SuccessMany) &&
                        Array.isArray(groups.data) &&
                        groups.data.map((group) => (
                            <div key={group.id} className="crud__item">
                                <p><strong>Nombre:</strong> {group.name}</p>
                                <div className="crud__buttonGroup">
                                    <button
                                        onClick={() => handleEdit(group)}
                                        className="crud__button--edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete({ id: group.id })}
                                        className="crud__button--delete"
                                    >
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default GroupCrud;
