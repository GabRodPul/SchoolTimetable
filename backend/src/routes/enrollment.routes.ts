import { Express, Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.crontoller";
import { hasRolePermissions } from "../controllers/auth";
import { UserRole } from "../../../common/@enums/models";

const EnrollmentRoutes = { init: ( app: Express ) => {
    const router = Router();
    
    // Create a new Changed Session
    router.post( "/", EnrollmentController.create );
    // router.post( "/", hasRolePermissions(UserRole.Teacher) SessionChangedController.create );
    
    // Retrive all Changed Session
    router.get( "/", EnrollmentController.findAll );
    
    // Retrive a single Changed Session with id
    router.get( "/:id", EnrollmentController.findByPk );
    
    // Update a Changed Session with id
    router.put( "/:id", EnrollmentController.update );
    
    // Update a Changed Session with id
    router.delete( "/:id", EnrollmentController.delete );

    app.use("/api/enrollment", router);
}};

export { EnrollmentRoutes };