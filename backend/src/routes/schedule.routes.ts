import { Router, Express } from "express";
import { ScheduleController } from "../controllers/schedule.controller";

const ScheduleRoutes = {
    init: (app: Express) => {
        const router = Router();

        // Asocia el método del controlador al endpoint
        router.get("/", ScheduleController.getSchedule2);

        // Registra la ruta en la aplicación principal
        app.use("/api/schedule", router);
    }
};

export { ScheduleRoutes };
