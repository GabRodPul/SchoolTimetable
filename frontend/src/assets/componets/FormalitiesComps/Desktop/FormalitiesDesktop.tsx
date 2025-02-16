import React, { useEffect, useRef, useState } from 'react';
import './FormalitiesDesktopStiles.css';
import { TxStatus, WsMsgType } from '#common/@enums/ws';
import DatePicker from 'react-datepicker';
import { ApiRts } from '#common/@enums/http';
import { useApi } from '#src/api/ApiContext';
import { AuthData, Id, WarningData } from '#common/@types/models';
import { FetchData, FetchState } from '#src/types/api';
// import { envvars } from '#src/env';
const envvars = { BEND_DB_HOST: "localhost", BEND_PORT: "8080" };

type Warning = WarningData & Id;

interface Request {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    status: TxStatus;
}

interface FormalitiesProps {
    requests: Request[];
    updateStatus: (id: number, newStatus: TxStatus) => void;
    createRequest: (request: Omit<Request, 'id' | 'status'>) => void;
}

const fetchLastId = async (): Promise<number> => {
    try {
        const response = await fetch("/api/warnings/last-id"); // Ajusta la URL a tu endpoint real
        const data = await response.json();
        return data.lastId ?? 0; // Si no hay registros, usa 0 como base
    } catch (error) {
        console.error("Error fetching last ID:", error);
        return 0;
    }
};

const FormalitiesDesktop: React.FC<FormalitiesProps> = ({ }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!) as AuthData;
    // const [warning, api] = useApi<Warning>(ApiRts.Warnings);
    const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [formState, setFormState] = useState<Warning>({
        id: 0,
        teacherId: 1,
        description: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        startHour: "",
        endHour: "",
        status: TxStatus.Pending,
    });
    
    const [warnings, setWarnings] = useState<Warning[] | null>(null);
    const ws = useRef<WebSocket>();
    const sendMsg = (type: WsMsgType, data: Warning) => {
        ws.current!.send(JSON.stringify({ type, data }));
    };

    useEffect(() => {
        // api.getAll();
        ws.current = new WebSocket(
            `ws://${envvars.BEND_DB_HOST}:${envvars.BEND_PORT}/?accessToken=${currentUser.accessToken}`,
            // [ "Authorization", `Bearer ${currentUser.accessToken}` ]
        );

        ws.current.onopen = () => {
            console.log("Connection established");
        }

        ws.current.onmessage = (event) => {
            console.log(event);
            // const data = JSON.parse(event.data);
            const data = event.data;
            setWarnings(data);
        }

        return () => {
            console.log("WS Cleanup");
            if (ws.current)
                ws.current.close(); 
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const { description, startHour, endHour } = formState;
        if (!description || !startHour || !endHour) {
            alert('Tous les champs sont obligatoires.');
            return false;
        }
        if (!startDate || !endDate || startDate > endDate) {
            alert('La date de début ne peut pas être postérieure à la date de fin.');
            return false;
        }
        return true;
    };

    const handleCreate = () => {
        if (!validateForm()) return;

        const { id, ...newWarning } = formState;
        sendMsg(WsMsgType.TxCreate, newWarning as any);
        setFormState({
            id: 0,
            teacherId: 1,
            description: "",
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
            startHour: "",
            endHour: "",
            status: TxStatus.Approved,
        });

        // api.post(newWarning as Warning)
        //     .then(() => {
        //         setFormState({
        //             id: 0,
        //             teacherId: 1,
        //             description: "",
        //             startDate: new Date().toISOString().split("T")[0],
        //             endDate: new Date().toISOString().split("T")[0],
        //             startHour: "",
        //             endHour: "",
        //             status: TxStatus.Approved,
        //         });
        //         api.getAll();
        //     })
        //     .catch((error) => {
        //         console.error("Error al realizar el POST:", error);
        //         alert("Hubo un error al intentar crear el trámite.");
        //     });
    };

    const handleEdit = (warnings: Warning) => {
        setSelectedWarning(warnings);
        setFormState(warnings);
    };

    const handleUpdate = () => {
        if (!selectedWarning || !validateForm()) return;
        sendMsg(WsMsgType.TxUpdate, { ...formState, id: selectedWarning.id });
        setFormState({
            id: selectedWarning.id,
            teacherId: 1,
            description: "",
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
            startHour: "",
            endHour: "",
            status: TxStatus.Approved
        });

        // api.put({ body: formState, id: selectedWarning.id })
        // .then(() => {
        //         setFormState({
        //             id: selectedWarning.id,
        //             teacherId: 1,
        //             description: "",
        //             startDate: new Date().toISOString().split("T")[0],
        //             endDate: new Date().toISOString().split("T")[0],
        //             startHour: "",
        //             endHour: "",
        //             status: TxStatus.Approved
        //         });
        //         api.getAll().then(() => setSelectedWarning(null));
        //     })
        //     .catch((error) => {
        //         console.error("Error al realizar el PUT:", error);
        //         alert("Hubo un error al intentar actualizar el trámite.");
        //     });
    };

    const handleDelete = (id: Id) => {
        sendMsg(WsMsgType.TxDelete, { id } as any)
        // api.delete(id)
        //     .then(() => api.getAll())
        //     .catch((error) => {
        //         console.error("Error al eliminar el trámite:", error);
        //         alert("Hubo un error al intentar eliminar el trámite.");
        //     });
    };

    return (
        <div className="formalities">
            <div className="formalities__content">
                {/* Formulaire de création */}
                <div className="formalities__makeForm">
                    <h2>Créer un Trámite</h2>
                    <form onSubmit={e => {
                        e.preventDefault();
                        selectedWarning ? handleUpdate() : handleCreate();
                    }}
                        className="formalitiesForm__data">
                        <label>
                            <p>Motif</p>
                            <input
                                type="text"
                                name="description"
                                placeholder="Motif de l'absence"
                                value={formState.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <p>Heure de Début</p>
                            <input
                                type="time"
                                name="startHour"
                                value={formState.startHour}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <p>Heure de Fin</p>
                            <input
                                type="time"
                                name="endHour"
                                value={formState.endHour}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            <p>Date de Début</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date | null) => {
                                    if (date) {
                                        setStartDate(date);
                                        setFormState(prev => ({ ...prev, startDate: date.toISOString().split("T")[0] }));
                                    }
                                }}
                                placeholderText='00/20/2000'

                            />
                        </label>
                        <label>
                            <p>Date de Fin</p>
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date | null) => {
                                    if (date) {
                                        setEndDate(date);
                                        setFormState(prev => ({ ...prev, endDate: date.toISOString().split("T")[0] }));
                                    }
                                }}
                                placeholderText='06/20/2000'

                            />
                        </label>
                        <button type="submit" className="formalities__button">
                            {selectedWarning ? "Editar Trámite" : "Crear"}
                        </button>
                        {selectedWarning && <button onClick={() => setSelectedWarning(null)} className="formalities__Cancelbutton">Cancelar</button>}
                    </form>
                </div>

                {/* Affichage des transactions */}
                <div className="formalities__info">
                    <h2>Tus Trámites</h2>
                    {warnings &&
                        Array.isArray(warnings) && warnings.map((warning) => {
                            const warningListed = warning as Warning;
                            const currentStatus = warning.status;
                            if (currentStatus === TxStatus.Approved)
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
    );
};

export default FormalitiesDesktop;
