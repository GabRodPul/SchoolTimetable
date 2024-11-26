import { Express, Router } from "express";
import { WarmingController } from "../controllers/warming.controller";

const WarmingRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", WarmingController.create );
    
    // Retrive all Users
    router.get( "/", WarmingController.findAll );
    
    // Retrive a single User with id
    // router.get( "/:id", WarmingController.findByPk );
    
    // Update a User with id
    router.put( "/:id", WarmingController.update );
    
    // Update a User with id
    router.delete( "/:id", WarmingController.delete );

    app.use("/api/warmings", router);

}};

export { WarmingRoutes };