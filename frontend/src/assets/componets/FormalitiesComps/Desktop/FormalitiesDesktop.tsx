import React, { useState } from 'react';
import './FormalitiesDesktopStiles.css';
import { TxStatus } from '#common/@enums/ws';
import DatePicker from 'react-datepicker';

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

const FormalitiesDesktop: React.FC<FormalitiesProps> = ({ requests, updateStatus, createRequest }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [formState, setFormState] = useState({
        description: '',
        startHour: '',
        endHour: '',
    });

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

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Création de la requête
        createRequest({
            description: formState.description,
            startHour: formState.startHour,
            endHour: formState.endHour,
            startDate: startDate!.toISOString().split('T')[0],
            endDate: endDate!.toISOString().split('T')[0],
        });

        // Réinitialisation du formulaire
        setFormState({ description: '', startHour: '', endHour: '' });
        setStartDate(new Date());
        setEndDate(new Date());
        alert('Demande créée avec succès !');
    };

    return (
        <div className="formalities">
            <div className="formalities__content">
                {/* Formulaire de création */}
                <div className="formalities__makeForm">
                    <h2>Créer un Trámite</h2>
                    <form onSubmit={handleCreate} className="formalitiesForm__data">
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
                                onChange={(date: Date | null) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </label>
                        <label>
                            <p>Date de Fin</p>
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date | null) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </label>
                        <button type="submit" className="formalities__button">
                            Créer
                        </button>
                    </form>
                </div>

                {/* Affichage des transactions */}
                <div className="formalities__info">
                    <h2>Vos Trámites</h2>
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <div key={request.id} className="formalities__card">
                                <p><strong>Motif :</strong> {request.description}</p>
                                <p>
                                    <strong>État :</strong>{' '}
                                    <span className={`status ${request.status.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Du :</strong> {request.startDate} à {request.startHour}
                                </p>
                                <p>
                                    <strong>Au :</strong> {request.endDate} à {request.endHour}
                                </p>
                                {request.status === TxStatus.Pending && (
                                    <div className="buttons">
                                        <button
                                            className="approve-btn"
                                            onClick={() => updateStatus(request.id, TxStatus.Approved)}
                                        >
                                            Approuver
                                        </button>
                                        <button
                                            className="deny-btn"
                                            onClick={() => updateStatus(request.id, TxStatus.Denied)}
                                        >
                                            Rejeter
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Aucun trámite disponible.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormalitiesDesktop;
