import { Express, Router } from "express";
import { WarningController } from "../controllers/warning.controller";
import {hasRolePermissions} from "../controllers/auth"
import { UserRole } from "../../../common/@enums/models";

const WarningRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", hasRolePermissions(UserRole.Teacher), WarningController.create );
    
    // Retrive all Users
    router.get( "/", WarningController.findAll );
    
    // Retrive a single User with id
    router.get( "/:id", WarningController.findOne );
    
    // Update a User with id
    router.put( "/:id", WarningController.update );
    
    // Update a User with id
    router.delete( "/:id", WarningController.delete );

    app.use("/api/warnings", router);

}};

export { WarningRoutes };