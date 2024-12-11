import { Express, Router } from "express";
import { GroupController } from "../controllers/group.controller";
import { UserRole } from "../../../common/@enums/models";
import { hasRolePermissions } from "../controllers/auth";

const GroupRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Group
    router.post( "/", hasRolePermissions(UserRole.Admin), GroupController.create );
    
    // Retrive all Group
    router.get( "/", GroupController.findAll );
    
    // Retrive a single Group with id
    router.get( "/:id", GroupController.findByPk );
    
    // Update a Group with id
    router.put( "/:id", hasRolePermissions(UserRole.Admin), GroupController.update );
    
    // Update a Group with id
    router.delete( "/:id", hasRolePermissions(UserRole.Admin), GroupController.delete );

    app.use("/api/groups", router);
}};

export { GroupRoutes };