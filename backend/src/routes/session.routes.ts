import { Express, Router } from "express";
import { SessionController } from "../controllers/session.controller";
import { UserRole } from "../../../common/@enums/models";
import { hasRolePermissions } from "../controllers/auth";

const SessionRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Session
    router.post( "/", hasRolePermissions(UserRole.Admin), SessionController.create );
    
    // Retrive all Session
    router.get( "/", SessionController.findAll );
    
    // Retrive a single Session with id
    router.get( "/:id", SessionController.findByPk);
    
    // Update a Session with id
    router.put( "/:id", hasRolePermissions(UserRole.Admin), SessionController.update );
    
    // Update a Session with id
    router.delete( "/:id", hasRolePermissions(UserRole.Admin), SessionController.delete );

    app.use("/api/session", router);
}};

export { SessionRoutes };