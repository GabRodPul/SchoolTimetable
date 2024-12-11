import { Express, Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.crontoller";
import { hasRolePermissions } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const EnrollmentRoutes = {
    init: (app: Express) => {
        const router = Router();

        // Create a new Changed Session
        router.post("/", hasRolePermissions(UserRole.Admin), EnrollmentController.create);

        // Retrive all Changed Session
        router.get("/", EnrollmentController.findAll);

        // Retrive a single Changed Session with id
        router.get("/:id", EnrollmentController.findByPk);

        // Update a Changed Session with id
        router.put("/:id", hasRolePermissions(UserRole.Admin), EnrollmentController.update);

        // Update a Changed Session with id
        router.delete("/:id", hasRolePermissions(UserRole.Admin), EnrollmentController.delete);

        app.use("/api/enrollment", router);
    }
};

export { EnrollmentRoutes };