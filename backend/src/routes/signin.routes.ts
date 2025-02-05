import { Express, Router } from "express";
import { hasRolePermissions, signin } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const SigninRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Login
    router.post( "/", signin );

    app.use("/api/signin", router);

}};

export { SigninRoutes };