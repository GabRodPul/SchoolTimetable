import { Express, Router } from "express";
import { Id, UserData, WarningData } from "#common/@types/models";
import expressWs from "express-ws";
import { WsMsgType, TxStatus } from "#common/@enums/ws";
import { WsWarningMsg } from "#common/@types/ws";
import { WebSocket } from "ws";
import { DB } from "#src/models";
import { UserRole } from "#common/@enums/models";
import { JwtPayload, verify } from "jsonwebtoken";
import { envvars } from "#src/env";
import { UserViewsController } from "#src/controllers/views_controllers/user.views.controller";
// import { WarningModel } from "#src/models/warning.model"; // Import du modèle Warning

const WsRoutes = {
  init: (app: Express) => {
    console.log("🔵 Initializing WebSockets...");
    expressWs(app);
    const router = Router();
    const clients: Map<WebSocket, { role: UserRole } & Id> = new Map(); // client -> user 
    const broadcast = async (teacherId: number) => {
      try {
        const data = await DB.warnings.findAll();

        clients.forEach((u, ws) => {
          if (ws.readyState !== 1)
            return;

          if (u.role >= UserRole.Head) {
            ws.send(data);
            return;
          }

          if (u.id === teacherId)
            ws.send(data.filter(w => w.teacherId === teacherId));
        });
      } catch (err: any) {
        console.log(err);
      }
    }

    router.ws("/", async (ws, req) => {
      console.log("✅ New websocket connection established!");
      
      {
        const dummyWarning = [{ 
          teacherId: 0, 
          description: "[ERROR]: Invalid token", 
          startDate: "1970-1-1",
          endDate: "1970-1-1", 
          startHour: "00:00",
          endHour: "00:01",
          status: TxStatus.Denied
        }] as WarningData[];

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        if (!token) {
          ws.send(dummyWarning);
          return;
        }

        verify(token, envvars.JWT_SECRET as string, async (err: any, decoded: any) => {
          if (err || !decoded) {
            ws.send(dummyWarning);
            return;
          }

          const user = decoded as JwtPayload;
          if (!user.email) {
            dummyWarning[0].description = "Invalid token payload."
            ws.send(dummyWarning);
            return;
          }

          try {
            const data = (await DB.users.findOne({ where: { email: user.email }, raw: true })) as (UserData & Id) | null;
            if (!data) {
              dummyWarning[0].description = `Invalid user.`;
              ws.send(dummyWarning);
              return;
            }

            clients.set(ws, { role: data.role, id: data.id });
          } catch (err: any) {
            dummyWarning[0].description = `Error retrieving User with email=${user.email}.`;
            ws.send(dummyWarning);
          }
        });
      }


      ws.on("message", async (wsReq) => {
        try {
          const req = JSON.parse(wsReq.toString()) as WsWarningMsg;

          switch (req.type) {
            case WsMsgType.TxCreate: {
              const { id, ...wsData } = req.data;

              // Add a new Warning to the database
              const newWarning = await DB.warnings.create(wsData as any); // as any to skip id complaints

              // Notification des clients connectés
              broadcast(clients.get(ws)!.id);
              console.log("New warning created:", newWarning);
            } break;

            case WsMsgType.TxApprove:
            case WsMsgType.TxDeny: {
              // Mise à jour du statut dans la base de données
              const updatedRequest = await DB.warnings.findByPk(req.data.id);
              if (!updatedRequest)
                throw new Error(`Warning with id=${req.data.id}`)

              if (updatedRequest) {
                updatedRequest.status = req.type === WsMsgType.TxApprove 
                                      ? TxStatus.Approved 
                                      : TxStatus.Denied;

                await updatedRequest.save();

                // Notification des clients connectés
                broadcast(clients.get(ws)!.id);
                console.log("Statut de la requête mis à jour :", updatedRequest);
              } else {
                console.error("Requête introuvable :", req.data.id);
              }
            } break;

            default:
              console.error("Message inconnu :", req);
          }
        } catch (error) {
          console.error("Error while processing WebSocket message:", error);
        }
      });

      ws.on("close", () => { clients.delete(ws); });
    });

    app.use("/", router);
    console.log("🔗 Route WebSocket `/ws` ajoutée à Express");
  },
};

export { WsRoutes };