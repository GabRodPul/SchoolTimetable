import { Express, Router } from "express";
import { hasRolePermissions, signin } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const SigninRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Login
    router.post( "/", hasRolePermissions(UserRole.Admin), signin );

    app.use("/api/signin", hasRolePermissions(UserRole.Admin), router);

}};

export { SigninRoutes };