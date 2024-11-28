import { Express, Router } from "express";
import { SessionChangedController } from "../controllers/session-changes.controller";
import { hasRolePermissions } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const SessionsChangedRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Changed Session
    router.post( "/", SessionChangedController.create );
    // router.post( "/", hasRolePermissions(UserRole.Teacher) SessionChangedController.create );
    
    // Retrive all Changed Session
    router.get( "/", SessionChangedController.findAll );
    
    // Retrive a single Changed Session with id
    router.get( "/:id", SessionChangedController.findOne );
    
    // Update a Changed Session with id
    router.put( "/:id", SessionChangedController.update );
    
    // Update a Changed Session with id
    router.delete( "/:id", SessionChangedController.delete );

    app.use("/api/session-changed", router);
}};

export { SessionsChangedRoutes };