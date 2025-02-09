import express, { Request, Response, NextFunction, Application } from "express";
import { DB } from "./models";
import cors from "cors";
import { envvars } from "./env";
import { UserRoutes } from "./routes/user.routes";
import { GroupRoutes } from "./routes/group.routes"
import { initApiRoutes } from "./routes";
import { UserRole } from "../../common/@enums/models";
import { hashSync } from "bcrypt";
import { dbInit } from "./utils/debug";
import bodyParser from "body-parser";

import session from "express-session"
import { NodeEnv } from "#common/@types/env";
import { WsRoutes } from "./routes/websocket.routes";

export const initApp = (views: boolean) => {
    const furl = `http://${envvars.BEND_DB_HOST}:${envvars.FEND_PORT}`;
    // console.log(furl)
    // const corsOptions = { origin: furl };
    const jwt = require('jsonwebtoken');

    // Config
    const app = express();
    app.use(express.json()); // content-type: application/json
    app.use(express.urlencoded({ extended: true })); // content-type: application/x-www-form-urlencoded
    app.use(cors());

    // Routes
    if (views) {
        app.set('views', './src/views');
        app.set('view engine', 'ejs');

        const _dummyData = [
            { value: "one"  },
            { value: "two"  },
            { value: "three"  },
            { value: "four"  },
            { value: "five"  },
        ];

        DB.store.sync();

        app.use(session({
            secret:             envvars.SESSION_SECRET!,
            store:              DB.store,
            resave:             false,
            saveUninitialized:  false,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000
            }
        }));

        app.get("/", (req, res) => {
            res.render('index', { 
                _backendOn: "School Timetable", 
                _dummyData,
                _dummyNumber: _dummyData.length
            });
        });
    } else {
        app.get("/", (req: Request, res: Response) => {
            res.json({ message: "Welcome to SchoolTimetable application." })
        });
    }

    initApiRoutes(app, views);

    // Avoid open handles
    if (envvars.NODE_ENV !== NodeEnv.Testing) {
        WsRoutes.init(app)
        dbInit(true).then();
        const PORT = process.env.PORT ?? 8080;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }

    return app;
}

export const app = initApp(envvars.BEND_VIEWS === '1');