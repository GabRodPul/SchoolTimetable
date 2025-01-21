import { Express, Router } from "express";
import { loginView, logoutView, signinView } from "../../controllers/views_controllers/auth.views.controller";

export const AuthViewRoutes = { init: (app: Express) => {
    const router = Router();
    router.post("/login",  loginView  );
    router.post("/signin", signinView );
    router.post("/logout", logoutView );

    app.use("/auth", router);
}}; 