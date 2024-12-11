import { Router, Express } from "express";
import { ScheduleController } from "../controllers/schedule.controller";

const ScheduleRoutes = {
    init: (app: Express) => {
        const router = Router();

        router.get("/", (req, res) => ScheduleController.getSchedule(req, res));
        app.use("/api/schedule", router);
    }
};

export { ScheduleRoutes };
