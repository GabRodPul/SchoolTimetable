import { Express } from "express";
import { UserRoutes } from "./user.routes";
import { CourseRoutes } from "./course.routes";
import { GroupRoutes } from "./group.routes";
import { LoginRoutes } from "./login.routes";
import { SigninRoutes } from "./signin.routes";
import { WarningRoutes } from "./warning.routes"
import { SessionRoutes } from "./session.routes"
import { ClassHourRoutes } from "./classHour.routes"
import {SessionsChangedRoutes} from "./sessions-changed.routes"
import {EnrollmentRoutes} from "./enrollment.routes"
import { ModuleRoutes } from "./module.routes";

type Routes = { init: (app: Express) => void };
const initApiRoutes = ( app: Express ) => {
    [
        UserRoutes,
        CourseRoutes,
        GroupRoutes,
        WarningRoutes,
        SessionRoutes,
        ClassHourRoutes,
        SessionRoutes,
        SessionsChangedRoutes,
        EnrollmentRoutes,
        ModuleRoutes,

        // Auth, given ApiRts enum we better use separate routes
        SigninRoutes,
        LoginRoutes,
    ].forEach( r => r.init(app) );
}

export { initApiRoutes };