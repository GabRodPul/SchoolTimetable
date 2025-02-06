import { Express, Router } from "express";
import { GroupViewsController } from "../../controllers/views_controllers/groups.views.controller";

export const GroupViewsRoutes = { init: (app: Express) => {
    const router = Router();
    
    // Save a new Group
    router.post("/",  GroupViewsController.store );

    // Retrive all Groups
    router.get("/", GroupViewsController.findAll );

    // Show Form to create a new Group
    router.get("/create", GroupViewsController.showCreateForm );

    // Show Form to edit Group with id
    router.get("/edit/:id", GroupViewsController.showEditForm );

    // Update some Group with id
    router.post("/update/:id", GroupViewsController.update );

    // Delete some Group with id
    router.post("/delete/:id", GroupViewsController.destroy );

    app.use("/groups2", router);
}};