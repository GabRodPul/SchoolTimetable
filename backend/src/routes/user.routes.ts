import { Express, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { hasRolePermissions } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const UserRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new User
    router.post( "/", hasRolePermissions(UserRole.Admin), UserController.create );
    
    // Retrive all Users
    router.get( "/", UserController.findAll );
    
    // Retrive a single User with id
    router.get( "/:id", UserController.findByPk );
    
    // Update a User with id
    router.put( "/:id",hasRolePermissions(UserRole.Admin), UserController.update );
    
    // Delete a User with id
    router.delete( "/:id", hasRolePermissions(UserRole.Admin), UserController.delete );

    app.use("/api/users", router);

}};

export { UserRoutes };