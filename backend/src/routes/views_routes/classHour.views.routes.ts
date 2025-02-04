import { Express, Router } from "express";
import  {ClassHourViewsController} from "../../controllers/views_controllers/classHour.views.controller"

export const ClassHourViewsRoutes = { init: (app: Express) => {
    const router = Router();
    // Save a new User
    router.post("/",  ClassHourViewsController.store );

    // Retrive all Users
    router.get("/", ClassHourViewsController.findAll );

    // Show Form to create a new User
    router.get("/create", ClassHourViewsController.showCreateForm );

    // Show Form to edit User with id
    router.get("/edit/:id", ClassHourViewsController.showEditForm );

    // Update some User with id
    router.post("/update/:id", ClassHourViewsController.update );

    // Delete some User with id
    router.post("/delete/:id", ClassHourViewsController.delete );

    app.use("/classHours", router);
}};