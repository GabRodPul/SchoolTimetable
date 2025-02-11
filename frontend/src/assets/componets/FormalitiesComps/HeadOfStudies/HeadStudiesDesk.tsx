import React, { useEffect, useState } from 'react';
import './HeadStudiesDeskStyles.css';
import { TxStatus } from '#common/@enums/ws';
import DatePicker from 'react-datepicker';
import { ApiRts } from '#common/@enums/http';
import { useApi } from '#src/api/ApiContext';
import { Id, WarningData } from '#common/@types/models';
import { FetchState } from '#src/types/api';
import { request } from 'http';

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

    const handleApprove = (warning: Warning) => {

    };

    const handleReject = (id: Id) => {
        api.delete(id)
            .then(() => api.getAll())
            .catch((error) => {
                console.error("Error al eliminar el trámite:", error);
                alert("Hubo un error al intentar eliminar el trámite.");
            });
    };

    return (
        <div className="formalities">
            <div className="formalities__content">


                {/* Affichage des transactions */}
                <div className="formalities__info">
                    <h2>Vos 
                        Trámites HeadOf</h2>

                    {(warning.state === FetchState.Success || warning.state === FetchState.SuccessMany) &&
                        Array.isArray(warning.data) && warning.data.map((warning) => {
                            const warningListed = warning as Warning;
                            const currentStatus = warning.status;
                            if (currentStatus !== TxStatus.Approved && currentStatus === TxStatus.Pending)
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
