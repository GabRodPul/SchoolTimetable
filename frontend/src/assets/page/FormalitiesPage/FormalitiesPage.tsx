import React, { useEffect, useState } from 'react';
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu'; // Importar el componente correctamente
import { LuBellRing } from 'react-icons/lu';
import './FormalitiesPageStyles.css';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { Id, WarningData } from '#common/@types/models';
import { FetchState } from '#src/types/api';
type Warning = WarningData & Id;

//* Define la interfaz para el estado
// interface Formalitie {
//     type: FormalitieType;
//     motive: string;
//     startDate: string;
//     endDate: string;
// }

const Formalities: React.FC = () => {

    const [warning, api] = useApi<Warning>(ApiRts.Warnings)
    const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
    const [formState, setFormState] = useState<Warning>({ id: 0, teacherId: 1, description: "", startDate: new Date(""), endDate: new Date(""), startHour: "", endHour: "" });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreate = () => {
        api.post(formState).then(() => {
            setFormState({ id: 0, teacherId: 1, description: "", startDate: new Date(""), endDate: new Date(""), startHour: "", endHour: "" });
            api.getAll();
        });
    };

    const handleUpdate = () => {
        if (!selectedWarning) return;
        api.put({ id: selectedWarning.id, body: formState }).then(() => {
            setSelectedWarning(null);
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

    if (warning.state === FetchState.Loading) return <p>Loading...</p>;
    if (warning.state === FetchState.Error) return <p>Error: {warning.error?.message}</p>;

    // Renderizar el componente
    return (
        <div>
            <NavigationTab />
            <RigthMenu />
            <div className="formalities__content">
                <div className="formalities__mobile">

                </div>

                <div className="formalities_desktop">
                    <div className="formalities__makeForm">
                        <div className="formalities__form">
                            <div className="formalitiesForm__title">
                                <h2>Trámites</h2>
                            </div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    selectedWarning ? handleUpdate() : handleCreate();
                                }}
                            >
                                <label>
                                    <p>Motivo</p>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Motivo de la ausencia"
                                        value={formState.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    <p>Hora Inicio</p>
                                    <input
                                        type="text"
                                        name="startHour"
                                        placeholder="Hora de inicio"
                                        value={formState.startHour}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label>
                                    <p>Hora Fin</p>
                                    <input
                                        type="text"
                                        name="endHour"
                                        placeholder="Hora de fin"
                                        value={formState.endHour}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    <p>Fecha inicio</p>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formState.startDate.toDateString()}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    <p>Fecha fin</p>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formState.endDate.toDateString()}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit" className="formalities__button">
                                    Añadir
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="formalities__info">
                        <div>
                            <h2>User List</h2>
                            {(warning.state === FetchState.Success || warning.state === FetchState.SuccessMany) &&
                                Array.isArray(warning.data) && warning.data.map((warning) => {
                                    const warningListed = warning as Warning;
                                    return (
                                        <div key={warningListed.id}>
                                            <p>
                                                {warningListed.description} {warningListed.startDate.toDateString()} - {warningListed.endDate.toDateString()} - {warningListed.startHour} - {warningListed.endHour}
                                            </p>
                                            <button onClick={() => handleEdit(warningListed.id)}>Edit</button>
                                            <button onClick={() => handleDelete({ id: warningListed.id })}>Delete</button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Formalities;
