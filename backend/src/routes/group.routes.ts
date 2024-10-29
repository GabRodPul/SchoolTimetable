import { Express, Router } from "express";
import { GroupController } from "../controllers/group.controller";

const GroupRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Group
    router.post( "/", GroupController.create );
    
    // Retrive all Group
    router.get( "/", GroupController.findAll );
    
    // Retrive a single Group with id
    router.get( "/:id", GroupController.findByPk );
    
    // Update a Group with id
    router.put( "/:id", GroupController.update );
    
    // Update a Group with id
    router.delete( "/:id", GroupController.delete );

    app.use("/api/groups", router);
}};

export { GroupRoutes };