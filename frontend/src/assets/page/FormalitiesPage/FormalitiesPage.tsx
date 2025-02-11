import React, { useEffect, useState } from 'react';
import './FormalitiesPageStyles.css';
import { WsMsg, TxStatus } from '#common/@enums/ws';
// Mobile
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import FormalitiesMobile from '#src/assets/componets/FormalitiesComps/Mobile/FormalitiesMobile';
// Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import FormalitiesDesktop from '#src/assets/componets/FormalitiesComps/Desktop/FormalitiesDesktop';
import { AuthData } from '#common/@types/models';
import HeadStudiesDesk from '#src/assets/componets/FormalitiesComps/HeadOfStudies/HeadStudiesDesk'

// Typage des requêtes
interface Request {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    status: TxStatus;
}

const Formalities: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]); // Stockage des demandes
    const [ws, setWs] = useState<WebSocket | null>(null); // Connexion WebSocket
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs WebSocket
    const { role } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

    useEffect(() => {
        // Connexion au serveur WebSocket
        const socket = new WebSocket('ws://localhost:8080/ws');
        setWs(socket);

        // Gestion des événements WebSocket
        socket.onopen = () => {
            console.log('✅ Connexion WebSocket établie');
        };

        socket.onerror = (event) => {
            console.error('❌ Erreur WebSocket :', event);
            setError('Une erreur est survenue avec la connexion WebSocket.');
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                handleIncomingMessage(message);
            } catch (err) {
                console.error('Erreur de parsing du message WebSocket :', err);
            }
        };

        socket.onclose = () => {
            console.log('⚠️ Connexion WebSocket fermée');
            setWs(null);
        };

        return () => {
            socket.close(); // Fermer la connexion à la sortie
        };
    }, []);

    const roleTextInfo = () => {
        switch (role) {
            case 'UR0_STUDENT': return 'Estudiante';
            case 'UR1_TEACHER': return 'Profesor';
            case 'UR2_HEAD': return 'Jefatura';
            case 'UR3_ADMIN': return 'Administrador';
            default: '';
        }
    }

    // Fonction pour gérer les messages entrants
    const handleIncomingMessage = (message: any) => {
        switch (message.type) {
            case WsMsg.TxCreate:
                setRequests((prev) => [...prev, message.data]); // Ajoute une nouvelle demande
                console.log('Nouvelle demande reçue :', message.data);
                break;

            case WsMsg.TxApprove:
            case WsMsg.TxDeny:
                setRequests((prev) =>
                    prev.map((req) =>
                        req.id === message.data.id
                            ? { ...req, status: message.data.status }
                            : req
                    )
                );
                console.log('Statut de la demande mis à jour :', message.data);
                break;

            default:
                console.error('Message WebSocket inconnu reçu :', message);
        }
    };

    // Fonction pour envoyer un message via WebSocket
    const sendMessage = (type: WsMsg, data: any) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ type, data });
            ws.send(message);
            console.log('Message envoyé via WebSocket :', message);
        } else {
            console.error('WebSocket non connecté.');
            setError('WebSocket non connecté. Veuillez réessayer plus tard.');
        }
    };

    // Fonction pour mettre à jour le statut d'une requête
    const updateRequestStatus = (id: number, newStatus: TxStatus) => {
        const messageType =
            newStatus === TxStatus.Approved ? WsMsg.TxApprove : WsMsg.TxDeny;
        sendMessage(messageType, { id });
    };

    return (
        <div className="body">
            {/* Affichage des erreurs */}
            {error && <p className="error-message">{error}</p>}

            {/* Affichage mobile */}
            <div className="mobile">
                <Header />
                <FormalitiesMobile
                    requests={requests}
                    updateStatus={updateRequestStatus}
                />
            </div>

            {/* Affichage desktop */}
            <div className="desktop">
                <NavigationTab />
                <RigthMenu />
                    <FormalitiesDesktop
                        requests={requests}
                        updateStatus={updateRequestStatus} createRequest={function (request: Omit<Request, 'id' | 'status'>): void {
                            throw new Error('Function not implemented.');
                        }} />

                {/* {role != 'UR1_TEACHER' &&
                    <HeadStudiesDesk
                        requests={requests}
                        updateStatus={updateRequestStatus} createRequest={function (request: Omit<Request, 'id' | 'status'>): void {
                            throw new Error('Function not implemented.');
                        }} />
                } */}

            </div>
        </div>
    );
};

export default Formalities;
