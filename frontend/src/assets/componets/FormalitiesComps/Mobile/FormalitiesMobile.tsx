import React, { useEffect, useState } from 'react';
import './FormalitiesMobileStyles.css';
import { Id, WarningData } from '#common/@types/models';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';
import { useNavigate } from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Warning = WarningData & Id;

const FormalitiesMobile: React.FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
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
                // navigate('/formalities')
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
        api.put({ body: formState, id: selectedWarning.id })
            .then(() => {
                console.log("PUT exitoso:", formState);
                setFormState({
                    id: selectedWarning.id,
                    teacherId: 1,
                    description: "",
                    startDate: "",
                    endDate: "",
                    startHour: "",
                    endHour: ""
                });
                api.getAll().then(() => {
                    setSelectedWarning(null);
                }); // Actualizar datos después de la actualización


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

    // if (warning.state === FetchState.Loading) return <p>Loading...</p>;
    // if (warning.state === FetchState.Error) return <p>Error: {warning.error?.message}</p>;

    return (
        <div className="formalitiesMobile">
            <div className="formalitiesMobile__content">
                <div className="formalitiesMobile__makeForm">
                    <div className="formalitiesMobileForm__title">
                        <h2>Trámites</h2>
                    </div>
                    <div className="formalitiesMobile__form">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                selectedWarning ? handleUpdate() : handleCreate();
                            }}
                            className='formalitiesMobile__data'
                        >
                            <label>
                                <p>Motivo</p>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Motivo de la ausencia"
                                    value={formState.description}
                                    onChange={handleInputChange}
                                    required
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
                                    required
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
                                    required
                                />
                            </label>
                            <label>
                                <p>Fecha de Inicio</p>
                                <DatePicker
                                    selected={startDate} onChange={(date: any) =>
                                        setStartDate(date)}
                                />
                            </label>
                            <label>
                                <p>Fecha de Fin</p>
                                <DatePicker
                                    selected={endDate} onChange={(date: any) =>
                                        setEndDate(date)}

                                />
                            </label>

                            <button type="submit" className="formalitiesMobile__button">
                                {selectedWarning ? "Editar" : "Crear"}
                            </button>
                            {selectedWarning && <button onClick={() => setSelectedWarning(null)} className="formalitiesMobile__Cancelbutton">Cancelar</button>}
                        </form>
                    </div>
                </div>

                <div className="formalitiesMobile__info">
                    <div className="formalitiesMobile__title">
                        <h2>Ver trámites Realizados</h2>
                    </div>
                    {(warning.state === FetchState.Success || warning.state === FetchState.SuccessMany) &&
                        Array.isArray(warning.data) && warning.data.map((warning) => {
                            const warningListed = warning as Warning;
                            return (
                                <div key={warningListed.id} className='formalitiesMobile__card'>
                                    <p>
                                        {warningListed.description}
                                    </p>
                                    <p>
                                        {warningListed.startDate} - {warningListed.endDate}
                                    </p>
                                    <p>
                                        {warningListed.startHour} - {warningListed.endHour}
                                    </p>
                                    <div className="buttons">
                                        <button onClick={() => handleEdit(warningListed)} className='Edit'>Editar</button>
                                        <button onClick={() => handleDelete({ id: warningListed.id })} className='Delete'>Eliminar</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default FormalitiesMobile;