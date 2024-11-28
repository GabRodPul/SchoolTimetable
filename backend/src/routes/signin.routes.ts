import { Express, Router } from "express";
import { signin } from "../controllers/auth";

const SigninRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Login
    router.post( "/", signin );

    app.use("/api/signin", router);

}};

export { SigninRoutes };