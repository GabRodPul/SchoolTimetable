import { Express, Router } from "express";
import { SessionController } from "../controllers/session.controller";

const SessionRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Session
    router.post( "/", SessionController.create );
    
    // Retrive all Session
    router.get( "/", SessionController.findAll );
    
    // Retrive a single Session with id
    router.get( "/:id", SessionController.findByPk);
    
    // Update a Session with id
    router.put( "/:id", SessionController.update );
    
    // Update a Session with id
    router.delete( "/:id", SessionController.delete );

    app.use("/api/session", router);
}};

export { SessionRoutes };