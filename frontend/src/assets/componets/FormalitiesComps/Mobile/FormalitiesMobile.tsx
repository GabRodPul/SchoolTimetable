import React from 'react';
import './FormalitiesMobileStyles.css';
import { TxStatus } from '#common/@enums/ws';

// Define the type for a single request
interface Request {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    status: TxStatus;
}

// Define the props for the FormalitiesMobile component
interface FormalitiesMobileProps {
    requests: Request[];
    updateStatus: (id: number, newStatus: TxStatus) => void;
}


// Define the FormalitiesMobile functional component
const FormalitiesMobile: React.FC<FormalitiesMobileProps> = ({ requests, updateStatus }) => {
    return (
        <div className="formalitiesMobile">
            <div className="formalitiesMobile__content">
                <h2>Trámites (Mobile View)</h2>
                
                {/* Display each request */}
                {requests.map((request) => (
                    <div key={request.id} className="formalitiesMobile__card">
                        <p><strong>Motivo:</strong> {request.description}</p>
                        <p>
                            <strong>Fecha:</strong> {request.startDate} - {request.endDate}
                        </p>
                        <p>
                            <strong>Hora:</strong> {request.startHour} - {request.endHour}
                        </p>
                        <p>
                            <strong>Estado:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span>
                        </p>

                        {/* Conditional rendering of buttons */}
                        {request.status === TxStatus.Pending && (
                            <div className="buttons">
                                <button
                                    className="approveButton"
                                    onClick={() => updateStatus(request.id, TxStatus.Approved)}
                                >
                                    Aprobar
                                </button>
                                <button
                                    className="denyButton"
                                    onClick={() => updateStatus(request.id, TxStatus.Denied)}
                                >
                                    Rechazar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormalitiesMobile;
