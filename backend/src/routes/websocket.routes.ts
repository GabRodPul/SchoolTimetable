import { Express, Router } from "express";
import { WarningData } from "#common/@types/models";
import expressWs from "express-ws";
import { WsMsg } from "#common/@enums/ws";
import { TxStatus } from "#common/@enums/ws";
import { WarningModel } from "#src/models/warning.model"; // Import du modèle Warning

const WsRoutes = {
    init: (app: Express) => {
        console.log("🔵 Initialisation des WebSockets...");
        expressWs(app);
        const router = Router();
        const clients: any[] = []; // Stock des connexions actives

        router.ws("/", (ws, req) => {
            console.log("✅ Nouvelle connexion WebSocket établie !");
            clients.push(ws);
        
            ws.on("message", async (msg) => {
                try {
                    const message = JSON.parse(msg.toString());
        
                    switch (message.type) {
                        case WsMsg.TxCreate:
                            // Création d'une nouvelle demande dans la base de données
                            const newRequest = await WarningModel.init(app.get("sequelize"))
        
                            // Notification des clients connectés
                            broadcast(clients, { type: WsMsg.TxCreate, data: newRequest });
                            console.log("Nouvelle demande créée :", newRequest);
                            break;
        
                        case WsMsg.TxApprove:

                        case WsMsg.TxDeny:
                            // Mise à jour du statut dans la base de données
                            const updatedRequest = await WarningModel.init(app.get("sequelize")).findByPk(message.data.id);
                            if (updatedRequest) {
                                updatedRequest.status =
                                    message.type === WsMsg.TxApprove ? TxStatus.Approved : TxStatus.Denied;
                                await updatedRequest.save();
        
                                // Notification des clients connectés
                                broadcast(clients, { type: message.type, data: updatedRequest });
                                console.log("Statut de la requête mis à jour :", updatedRequest);
                            } else {
                                console.error("Requête introuvable :", message.data.id);
                            }
                            break;
        
                        default:
                            console.error("Message inconnu :", message);
                    }
                } catch (error) {
                    console.error("Erreur dans le traitement du message WebSocket :", error);
                }
            });
        
            ws.on("close", () => {
                console.log("Connexion fermée");
                const index = clients.indexOf(ws);
                if (index !== -1) clients.splice(index, 1);
            });
        });
        
        app.use("/ws", router);
        console.log("🔗 Route WebSocket `/ws` ajoutée à Express");

        // Fonction pour notifier tous les clients
        function broadcast(clients: any[], data: any) {
            console.log("📡 Envoi d'un message à tous les clients :", data);
            clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    },
};

export { WsRoutes };
