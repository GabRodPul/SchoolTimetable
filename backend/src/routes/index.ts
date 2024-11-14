import { Express } from "express";
import { UserRoutes } from "./user.routes";
import { CourseRoutes } from "./course.routes";
import { GroupRoutes } from "./group.routes";

type Routes = { init: (app: Express) => void };
const initApiRoutes = ( app: Express ) => {
    [
        UserRoutes,
        CourseRoutes,
        GroupRoutes,

    ].forEach( r => r.init(app) );
}

export { initApiRoutes };