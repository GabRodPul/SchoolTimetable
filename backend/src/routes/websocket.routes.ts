import { Express, Router } from "express";
import { WarningData } from "#common/@types/models";
import expressWs from "express-ws";
import { WsMsgType, TxStatus } from "#common/@enums/ws";
import { WsWarningMsg } from "#common/@types/ws";
import { DB } from "#src/models";
// import { WarningModel } from "#src/models/warning.model"; // Import du modèle Warning

// Fonction pour notifier tous les clients
function broadcast(clients: any[], msg: WsWarningMsg) {
  console.log("📡 Envoi d'un message à tous les clients :", msg);
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(msg));
    }
  });
}

const WsRoutes = {
  init: (app: Express) => {
    console.log("🔵 Initializing WebSockets...");
    expressWs(app);
    const router = Router();
    const clients: any[] = []; // Stock des connexions actives

    router.ws("/", (ws, req) => {
      console.log("✅ New websocket connection established!");
      clients.push(ws);

      ws.on("message", async (wsReq) => {
        try {
          const req = JSON.parse(wsReq.toString()) as WsWarningMsg;

          switch (req.type) {
            case WsMsgType.TxCreate: {
              const { id, ...wsData } = req.data;

              // Add a new Warning to the database
              const newWarning = await DB.warnings.create(wsData as any); // as any to skip id complaints

              // Notification des clients connectés
              broadcast(clients, { type: WsMsgType.TxCreate, data: newWarning as WarningData });
              console.log("New warning created:", newWarning);
            } break;

            case WsMsgType.TxApprove:
            case WsMsgType.TxDeny:
              // Mise à jour du statut dans la base de données
              const updatedRequest = await WarningModel.init(app.get("sequelize")).findByPk(req.data.id);
              if (!updatedRequest)
                throw new Error(`Warning with id=${req.data.id}`)

              if (updatedRequest) {
                updatedRequest.status = req.type === WsMsgType.TxApprove ? TxStatus.Approved : TxStatus.Denied;
                await updatedRequest.save();

                // Notification des clients connectés
                broadcast(clients, { type: req.type, data: updatedRequest });
                console.log("Statut de la requête mis à jour :", updatedRequest);
              } else {
                console.error("Requête introuvable :", req.data.id);
              }
              break;

            default:
              console.error("Message inconnu :", req);
          }
        } catch (error) {
          console.error("Error while processing WebSocket message:", error);
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
  },
};

export { WsRoutes };
