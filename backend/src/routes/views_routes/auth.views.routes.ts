import { Express, Router } from "express";
import { 
    login, 
    logoutView, 
    register,
    signin,
    signup,
} from "../../controllers/views_controllers/auth.session";

export const AuthViewRoutes = { init: (app: Express) => {
    const router = Router();
    router.get("/login",    login       );
    // router.get("/register", register    );
    router.post("/signin",  signin      );
    // router.post("/signup",  signup      );

    app.use("/auth", router);
}}; 