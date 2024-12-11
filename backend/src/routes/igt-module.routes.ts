import { Express, Router } from "express";
import { IGTModuleController } from "../controllers/igt-module.controller";
import {hasRolePermissions} from "../controllers/auth"
import { UserRole } from "../../../common/@enums/models";

const IGTModuleRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new warning, with a middleware to filter, only allowing teachers
    router.post( "/", hasRolePermissions(UserRole.Admin), IGTModuleController.create );
    
    // Retrive all warnings
    router.get( "/", IGTModuleController.findAll );
    
    // Retrive a warning with id
    router.get( "/:id", IGTModuleController.findByPk );
    
    // Update a Warning with id
    router.put( "/:id", hasRolePermissions(UserRole.Admin), IGTModuleController.update );
    
    // Delete a Warning with id
    router.delete( "/:id", hasRolePermissions(UserRole.Admin), IGTModuleController.delete );

    app.use("/api/igt_modules", router);

}};

export { IGTModuleRoutes };