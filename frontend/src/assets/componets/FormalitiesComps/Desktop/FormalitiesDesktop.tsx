import React, { useEffect, useState } from 'react';
import './FormalitiesDesktopStyles.css';
import { Id, WarningData } from '#common/@types/models';
import { useApi } from '#src/api/ApiContext';
import { ApiRts } from '#common/@enums/http';
import { FetchState } from '#src/types/api';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';

type Warning = WarningData & Id;


const FormalitiesDesktop: React.FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [warning, api] = useApi<Warning>(ApiRts.Warnings);
    const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
    const [formState, setFormState] = useState<Warning>({
        id: 19,
        teacherId: 1,
        description: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
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

    const validateForm = () => {
        const { description, startDate, endDate, startHour, endHour } = formState;
        if (!description || !startDate || !endDate || !startHour || !endHour) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;
        api.post(formState)
            .then(() => {
                setFormState({
                    id: 0,
                    teacherId: 1,
                    description: "",
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    startHour: "",
                    endHour: ""
                });
                api.getAll();
            })
            .catch((error) => {
                console.error("Error al realizar el POST:", error);
                alert("Hubo un error al intentar crear el trámite.");
            });
    };

    const handleUpdate = () => {
        if (!selectedWarning || !validateForm()) return;
        api.put({ body: formState, id: selectedWarning.id })
            .then(() => {
                setFormState({
                    id: selectedWarning.id,
                    teacherId: 1,
                    description: "",
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    startHour: "",
                    endHour: ""
                });
                api.getAll().then(() => setSelectedWarning(null));
            })
            .catch((error) => {
                console.error("Error al realizar el PUT:", error);
                alert("Hubo un error al intentar actualizar el trámite.");
            });
    };

    const handleDelete = (id: Id) => {
        api.delete(id)
            .then(() => api.getAll())
            .catch((error) => {
                console.error("Error al eliminar el trámite:", error);
                alert("Hubo un error al intentar eliminar el trámite.");
            });
    };

    const handleEdit = (warnings: Warning) => {
        setSelectedWarning(warnings);
        setFormState(warnings);
    };

    // if (warning.state === FetchState.Loading) return <p>Cargando...</p>;
    // if (warning.state === FetchState.Error) return <p>Error: {warning.error?.message}</p>;

    return (

        <div className="formalities">
            <div className="formalities__content_desktop">
                <div className="formalities__makeForm">
                    <div className="formalitiesForm__title">
                        <h2>Realizar Trámites</h2>
                    </div>
                    <div className="formalities__form">
                        <form
                            data-testid="warning-test-form"
                            onSubmit={e => {
                                e.preventDefault();
                                selectedWarning ? handleUpdate() : handleCreate();
                            }}
                            className='formalitiesForm__data'
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
                                    // selected={startDate}
                                    onChange={(date: Date | null) => {
                                        if (date) {
                                            setStartDate(date);
                                            setFormState(prev => ({ ...prev, startDate: date.toISOString().split("T")[0] }));
                                        }
                                    }}
                                    placeholderText='00/20/2000'
                                    required
                                />
                            </label>
                            <label>
                                <p>Fecha de Fin</p>
                                <DatePicker
                                    // selected={endDate}
                                    onChange={(date: Date | null) => {
                                        if (date) {
                                            setEndDate(date);
                                            setFormState(prev => ({ ...prev, endDate: date.toISOString().split("T")[0] }));
                                        }
                                    }}
                                    placeholderText='06/20/2000'
                                    required
                                />
                            </label>
                            <button type="submit" className={`formalities__Deskbutton ${selectedWarning ? "edit-mode" : "create-mode"}`}>
                                {selectedWarning ? "Editar Trámite" : "Crear"}
                            </button>
                            {selectedWarning && <button onClick={() => setSelectedWarning(null)} className="formalities__Cancelbutton">Cancelar</button>}
                        </form>
                    </div>
                </div>


                <div className="formalities__info_desktop">
                    <div className="formalitiesInfo__title">
                        <h2>Trámites Realizados</h2>
                    </div>
                    <div className='Content__CrdsDesktop'>
                        {(warning.state === FetchState.Success || warning.state === FetchState.SuccessMany) &&
                            Array.isArray(warning.data) && warning.data.map((warning) => {
                                const warningListed = warning as Warning;
                                return (
                                    <div key={warningListed.id} className='formalirties__card'>
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
        </div>

    );
};

export default FormalitiesDesktop;