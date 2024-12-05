import { Express, Router } from "express";
import { login } from "../controllers/auth";

const LoginRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Login
    router.post( "/", login );

    app.use("/api/login", router);

}};

export { LoginRoutes };