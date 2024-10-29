import { Express, Router } from "express";
import { CourseController } from "../controllers/course.controller";

const CourseRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", CourseController.create );
    
    // Retrive all Users
    router.get( "/", CourseController.findAll );
    
    // Retrive a single User with id
    router.get( "/:id", CourseController.findByPk );
    
    // Update a User with id
    router.put( "/:id", CourseController.update );
    
    // Update a User with id
    router.delete( "/:id", CourseController.delete );

    app.use("/api/courses", router);
}};

export { CourseRoutes };