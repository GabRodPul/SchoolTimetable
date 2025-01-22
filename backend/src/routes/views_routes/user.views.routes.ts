import { Express, Router } from "express";
import { UserViewsController } from "../../controllers/views_controllers/user.views.controller";

export const UserViewsRoutes = { init: (app: Express) => {
    const router = Router();
    
    // Save a new User
    router.post("/",  UserViewsController.store );

    // Retrive all Users
    router.get("/", UserViewsController.findAll );

    // Show Form to create a new User
    router.get("/create", UserViewsController.create );

    // Show Form to edit User with id
    router.get("/edit/:id", UserViewsController.edit );

    // Update some User with id
    router.post("/update/:id", UserViewsController.update );

    // Delete some User with id
    router.post("/delete/:id", UserViewsController.destroy );

    app.use("/users", router);
}};