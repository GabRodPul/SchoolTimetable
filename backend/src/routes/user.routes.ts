import { Express, Router } from "express";
import { UserController } from "../controllers/user.controller";

const UserRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", UserController.create );
    
    // Retrive all Users
    router.get( "/", auth.isAuthenticated, UserController.findAll );
    
    // Retrive a single User with id
    router.get( "/:id", auth.isAuthenticated, UserController.findByPk );
    
    // Update a User with id
    router.put( "/:id", UserController.update );
    
    // Update a User with id
    router.delete( "/:id", UserController.delete );

    app.use("/api/users", router);

    router.post("/singin", auth.singin);
}};

export { UserRoutes };