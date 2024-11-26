import { Express, Router } from "express";
import { WarningController } from "../controllers/warning.controller";
import {hasRolePermissions} from "../controllers/auth"
import { UserRole } from "../../../common/@enums/models";

const WarningRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new warning, with a middleware to filter, only allowing teachers
    router.post( "/", hasRolePermissions(UserRole.Teacher), WarningController.create );
    
    // Retrive all warnings
    router.get( "/", WarningController.findAll );
    
    // Retrive a warning with id
    router.get( "/:id", WarningController.findOne );
    
    // Update a Warning with id
    router.put( "/:id", WarningController.update );
    
    // Delete a Warning with id
    router.delete( "/:id", WarningController.delete );

    app.use("/api/warnings", router);

}};

export { WarningRoutes };