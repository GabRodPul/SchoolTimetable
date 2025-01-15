import { Express } from "express";
import { UserRoutes } from "./user.routes";
import { GroupRoutes } from "./group.routes";
import { LoginRoutes } from "./login.routes";
import { SigninRoutes } from "./signin.routes";
import { WarningRoutes } from "./warning.routes"
import { SessionRoutes } from "./session.routes"
import { ClassHourRoutes } from "./classHour.routes"
import { SessionsChangedRoutes } from "./sessions-changed.routes"
import { EnrollmentRoutes } from "./enrollment.routes"
import { ModuleRoutes } from "./module.routes";
import { IGTModuleRoutes } from "./igt-module.routes";
import { ScheduleRoutes } from "./schedule.routes";

const groupViewRoutes = require("./view_routes/groupe.views.routes");

type Routes = { init: (app: Express) => void };
const initApiRoutes = (app: Express) => {
    [
        UserRoutes,
        GroupRoutes,
        WarningRoutes,
        SessionRoutes,
        ClassHourRoutes,
        SessionRoutes,
        SessionsChangedRoutes,
        EnrollmentRoutes,
        ModuleRoutes,
        IGTModuleRoutes,
        ScheduleRoutes,

        // Auth, given ApiRts enum we better use separate routes
        SigninRoutes,
        LoginRoutes,
    ].forEach(r => r.init(app));

    // require("./routes/user.views.routes")(app);

    groupViewRoutes(app);
}

export { initApiRoutes };