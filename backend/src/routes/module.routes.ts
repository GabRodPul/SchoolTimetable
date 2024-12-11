import { Express, Router } from "express";
import { ModuleController } from "../controllers/module.controller";
import {hasRolePermissions} from "../controllers/auth"
import { UserRole } from "../../../common/@enums/models";

const ModuleRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new warning, with a middleware to filter, only allowing teachers
    router.post( "/", hasRolePermissions(UserRole.Admin), ModuleController.create );
    
    // Retrive all warnings
    router.get( "/", ModuleController.findAll );
    
    // Retrive a warning with id
    router.get( "/:id", ModuleController.findByPk );
    
    // Update a Warning with id
    router.put( "/:id", hasRolePermissions(UserRole.Admin), ModuleController.update );
    
    // Delete a Warning with id
    router.delete( "/:id", hasRolePermissions(UserRole.Admin), ModuleController.delete );

    app.use("/api/modules", router);

}};

export { ModuleRoutes };