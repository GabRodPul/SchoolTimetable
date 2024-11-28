import { Express, Router } from "express";
import { ClassHourController } from "../controllers/classHour.controller";

const ClassHourRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", ClassHourController.create );
    
    // Retrive all Users
    router.get( "/", ClassHourController.findAll );
    
    // Retrive a single User with id
    router.get( "/:id", ClassHourController.findOne );
    
    // Update a User with id
    router.put( "/:id", ClassHourController.update );
    
    // Update a User with id
    router.delete( "/:id", ClassHourController.delete );

    app.use("/api/courses", router);
}};

export { ClassHourRoutes };