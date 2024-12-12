import React, { useEffect, useState } from 'react';
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import { LuBellRing } from 'react-icons/lu';
import './FormalitiesPageStyles.css';
import { Id, WarningData } from '#common/@types/models';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';
import { useNavigate } from 'react-router';

type Warning = WarningData & Id;

const Formalities: React.FC = () => {
        const navigate = useNavigate();
    const [warning, api] = useApi<Warning>(ApiRts.Warnings);
    const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
    const [formState, setFormState] = useState<Warning>({
        id: 9,
        teacherId: 1,
        description: "",
        startDate: "",
        endDate: "",
        startHour: "",
        endHour: ""
    });

    useEffect(() => {
        api.getAll();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // Validación de campos antes de hacer el POST
    const validateForm = () => {
        const { description, startDate, endDate, startHour, endHour } = formState;
        if (!description || !startDate || !endDate || !startHour || !endHour) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        // Validamos el formulario antes de realizar el POST
        if (!validateForm()) return;
        console.log("Enviando datos al backend:", formState);
        api.post(formState)
            .then(() => {
                console.log("POST exitoso:", formState);
                // Asumimos que el backend devuelve el nuevo objeto creado
                const newWarning = formState; // Asegúrate de que esto contenga la ID generada
                setFormState({
                    id: newWarning.id, // Actualiza el estado con la ID generada
                    teacherId: 1,
                    description: "",
                    startDate: "",
                    endDate: "",
                    startHour: "",
                    endHour: ""
                });
                api.getAll(); // Actualizar datos después del POST
                console.log("Aparezco");
                navigate('/formalities')
            })
            .catch((error) => {
                console.error("Error al realizar el POST:", error);
                alert("Hubo un error al intentar crear el trámite.");
            });
    };

    const handleUpdate = () => {
        if (!selectedWarning) return;
        // Validación de formulario antes de actualizar
        if (!validateForm()) return;
        api.put({ id: selectedWarning.id, body: formState })
            .then(() => {
                console.log("PUT exitoso:", formState);
                setFormState({
                    id: 9,
                    teacherId: 1,
                    description: "",
                    startDate: "",
                    endDate: "",
                    startHour: "",
                    endHour: ""
                });
                api.getAll(); // Actualizar datos después de la actualización
                
            })
            .catch((error) => {
                console.error("Error al realizar el PUT:", error);
                alert("Hubo un error al intentar actualizar el trámite.");
            });
    };

    const handleDelete = (id: Id) => {
        api.delete(id)
            .then(() => {
                api.getAll(); // Actualizar datos después de eliminar
            })
            .catch((error) => {
                console.error("Error al eliminar el trámite:", error);
                alert("Hubo un error al intentar eliminar el trámite.");
            });
    };

    const handleEdit = (warnings: Warning) => {
        setSelectedWarning(warnings);
        setFormState(warnings); // Establecer los datos del trámite en el formulario para editar
    };

    if (warning.state === FetchState.Loading) return <p>Loading...</p>;
    if (warning.state === FetchState.Error) return <p>Error: {warning.error?.message}</p>;

    return (
        <div>
            <NavigationTab />
            <RigthMenu />
            <div className="formalities__content">
                <div className="formalities_desktop">
                    <div className="formalities__makeForm">
                        <div className="formalitiesForm__title">
                            <h2>Trámites</h2>
                        </div>
                        <div className="formalities__form">
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
                                        type="text"
                                        name="startDate"
                                        placeholder="Ejemplo: 2000/08/21"
                                        value={formState.startDate}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    <p>Fecha fin</p>
                                    <input
                                        type="text"
                                        name="endDate"
                                        placeholder="Ejemplo: 2000/08/21"
                                        value={formState.endDate}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit" className="formalities__button">
                                    {selectedWarning ? "Update" : "Create"}
                                </button>
                                {selectedWarning && <button onClick={() => setSelectedWarning(null)}>Cancel</button>}
                            </form>
                        </div>
                    </div>

                    <div className="formalities__info">
                        <div className="formalitiesInfo__title">
                            <h2>Tus Trámites</h2>
                        </div>
                        {(warning.state === FetchState.Success || warning.state === FetchState.SuccessMany) &&
                            Array.isArray(warning.data) && warning.data.map((warning) => {
                                const warningListed = warning as Warning;
                                return (
                                    <div key={warningListed.id}>
                                        <p>
                                            {warningListed.description} {warningListed.startDate} - {warningListed.endDate} - {warningListed.startHour} - {warningListed.endHour}
                                        </p>
                                        <button onClick={() => handleEdit(warningListed)}>Edit</button>
                                        <button onClick={() => handleDelete({ id: warningListed.id })}>Delete</button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Formalities;
