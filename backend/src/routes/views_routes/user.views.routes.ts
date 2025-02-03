import { Express, Router } from "express";
import { UserViewsController } from "../../controllers/views_controllers/user.views.controller";
import { UserRole } from "../../../../common/@enums/models";
import { hasRolePermissions } from "../../controllers/views_controllers/auth.session";

export const UserViewsRoutes = { init: (app: Express) => {
    const router = Router();
    
    // Save a new User
    router.post("/",  hasRolePermissions(UserRole.Admin), UserViewsController.store );

    // Retrive all Users
    router.get("/", hasRolePermissions(UserRole.Admin), UserViewsController.findAll );

    // Show Form to create a new User
    router.get("/create", hasRolePermissions(UserRole.Admin), UserViewsController.create );

    // Show Form to edit User with id
    router.get("/edit/:id", hasRolePermissions(UserRole.Admin), UserViewsController.edit );

    // Update some User with id
    router.post("/update/:id", hasRolePermissions(UserRole.Admin), UserViewsController.update );

    // Delete some User with id
    router.post("/delete/:id", hasRolePermissions(UserRole.Admin), UserViewsController.destroy );

    app.use("/users", router);
}};