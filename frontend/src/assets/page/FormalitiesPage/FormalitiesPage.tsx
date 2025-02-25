import React, { useEffect, useRef, useState } from 'react';
import './FormalitiesPageStyles.css';
import { WsMsgType, TxStatus } from '#common/@enums/ws';
// Mobile
import Header from '#src/assets/componets/CommonComps/MenuheaderMobile/Header';
import FormalitiesMobile from '#src/assets/componets/FormalitiesComps/Mobile/FormalitiesMobile';
// Desktop
import NavigationTab from '#src/assets/componets/CommonComps/navigationTab/NavigationTab';
import RigthMenu from '#src/assets/componets/CommonComps/rigthMenu/rigthMenu';
import FormalitiesDesktop from '#src/assets/componets/FormalitiesComps/Desktop/FormalitiesDesktop';
import { AuthData } from '#common/@types/models';
import HeadStudiesDesk from '#src/assets/componets/FormalitiesComps/HeadOfStudies/HeadStudiesDesk'

const envvars = { BEND_DB_HOST: "localhost", BEND_PORT: "8080" };

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
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!) as AuthData;
    const [requests, setRequests] = useState<Request[]>([]); // Stockage des demandes
    
    // const [ws, setWs] = useState<WebSocket | null>(null); // Connexion WebSocket
    const ws = useRef<WebSocket>();
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs WebSocket
    const { role } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

    useEffect(() => {
        // Connexion au serveur WebSocket
        ws.current = new WebSocket(
            `ws://${envvars.BEND_DB_HOST}:${envvars.BEND_PORT}/ws/?accessToken=${currentUser.accessToken}`,
            // [ "Authorization", `Bearer ${currentUser.accessToken}` ]
        );
        let socket = ws.current;

        socket.onopen = () => {
            console.log("Connection established");
            // socket!.send(JSON.stringify({ type: WsMsgType.GetAll }))
        }

        // socket.onmessage = (event) => {
            // console.log("onmessage");
            // const data = JSON.parse(event.data);
            // setRequests(data);
        // }

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                // console.log(message);
                console.log("onmessage");
                handleIncomingMessage(message);
            } catch (err) {
                console.error('Erreur de parsing du message WebSocket :', err);
            }
        };

        socket.onclose = () => {
            console.log('⚠️ Connexion WebSocket fermée');
            socket.close();
        };

        return () => {
            console.log("WS Cleanup");
            if (ws.current)
                ws.current.close(); 
        }
    });

    useEffect(() => {
        console.log(requests);
    }, [requests])

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
        console.log("handleIncoming");
        setRequests(message.data);
        return;
        switch (message.type) {
            case WsMsgType.GetAll:
            case WsMsgType.TxCreate:
                // setRequests((prev) => [...prev, message.data]); // Ajoute une nouvelle demande
                setRequests(message.data); // Ajoute une nouvelle demande
                // console.log('Nouvelle demande reçue :', message.data);
                console.log("HANDLEINCOMING")
                console.log(message.data)
                break;

            case WsMsgType.TxApprove:
            case WsMsgType.TxDeny:
                setRequests(
                    // prev.map((req) => req.id === message.data.id ? { ...req, status: message.data.status } : req)
                    message.data
                );
                console.log('Statut de la demande mis à jour :', message.data);
                break;

            default:
                console.error('Message WebSocket inconnu reçu :', message);
        }
    };

    // Fonction pour envoyer un message via WebSocket
    const sendMessage = (type: WsMsgType, data: any) => {
        
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ 
                type, 
                // data 
            });
            ws.current.send(message);
            console.log('Message envoyé via WebSocket :', message);
        } else {
            console.error('WebSocket non connecté.');
            setError('WebSocket non connecté. Veuillez réessayer plus tard.');
        }
    };

    // Fonction pour mettre à jour le statut d'une requête
    const updateRequestStatus = (id: number, newStatus: TxStatus) => {
        const messageType =
            newStatus === TxStatus.Approved ? WsMsgType.TxApprove : WsMsgType.TxDeny;
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
                {role !== 'UR2_HEAD' && (
                    <FormalitiesDesktop
                    requests={requests}
                    updateStatus={updateRequestStatus} createRequest={function (request: Omit<Request, 'id' | 'status'>): void {
                        throw new Error('Function not implemented.');
                    }} />
                )}
                {role === 'UR2_HEAD' && (
                    <HeadStudiesDesk
                        requests={requests}
                        updateStatus={updateRequestStatus}
                        createRequest={function (request: Omit<Request, 'id' | 'status'>): void {
                            throw new Error('Function not implemented.');
                        }}
                        />
                    )}
                <button onClick={() => sendMessage(WsMsgType.GetAll, {})}>GET ALL</button>
            </div>
        </div>
    );
};

export default Formalities;
