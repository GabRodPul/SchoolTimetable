import React, { useEffect, useState } from 'react';
import './HeadStudiesDeskStyles.css';
import { TxStatus } from '#common/@enums/ws';
import DatePicker from 'react-datepicker';
import { ApiRts } from '#common/@enums/http';
import { useApi } from '#src/api/ApiContext';
import { Id, WarningData } from '#common/@types/models';
import { FetchState } from '#src/types/api';

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

const FormalitiesDesktop: React.FC<FormalitiesProps> = ({ }) => {

    const [warning, api] = useApi<Warning>(ApiRts.Warnings);

    useEffect(() => {
        api.getAll();
    }, []);

    const handleApprove = (warnings: Warning) => {

    };

    const handleReject = (id: Id) => {

    };

    return (
        <div className="formalities">
            <div className="formalities__content">
    

                {/* Affichage des transactions */}
                <div className="formalities__info">
                    <h2>Vos Trámites HeadOf</h2>
                    {/* {requests.length > 0 ? (
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
                    )} */}

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
                                        <button onClick={() => handleApprove(warningListed)} className='Approve'>Approve</button>
                                        <button onClick={() => handleReject({ id: warningListed.id })} className='Reject'>Reject</button>
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
