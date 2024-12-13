import { Express, Router } from "express";
import { ClassHourController } from "../controllers/classHour.controller";
import { UserRole } from "../../../common/@enums/models";
import { hasRolePermissions } from "../controllers/auth";

const ClassHourRoutes = {
    init: (app: Express) => {
        const router = Router();

        // Create a new User
        router.post("/", hasRolePermissions(UserRole.Admin), ClassHourController.create);

        // Retrive all Users
        router.get("/", ClassHourController.findAll);

        // Retrive a single User with id
        router.get("/:id", ClassHourController.findOne);

        // Update a User with id
        router.put("/:id", hasRolePermissions(UserRole.Admin), ClassHourController.update);

        // Update a User with id
        router.delete("/:id", hasRolePermissions(UserRole.Admin), ClassHourController.delete);

        app.use("/api/classHour", router);
    }
};

export { ClassHourRoutes };