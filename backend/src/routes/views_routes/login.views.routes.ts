import { Express, Router } from "express";
import { loginView, logoutView, registerView } from "../../controllers/views_controllers/auth.session";

export const AuthViewRoutes = { init: (app: Express) => {
    const router = Router();
    router.post("/login",  loginView    );
    router.post("/signin", registerView );
    router.post("/logout", logoutView   );

    app.use("/auth", router);
}}; 