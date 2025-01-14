import express, { Request, Response, NextFunction } from "express";
import { DB } from "./models";
import cors from "cors";
import { envvars } from "./env";
import { UserRoutes } from "./routes/user.routes";
import { GroupRoutes } from "./routes/group.routes"
import { initApiRoutes } from "./routes";
import { UserRole } from "../../common/@enums/models";
import { hashSync } from "bcrypt";
import { dbInit } from "./utils/debug";

const furl = `http://localhost:${envvars.FEND_PORT}`;
// console.log(furl)
// const corsOptions = { origin: furl };
const jwt = require('jsonwebtoken');

// Config
const app = express();
app.use(express.json()); // content-type: application/json
app.use(express.urlencoded({ extended: true })); // content-type: application/x-www-form-urlencoded
// app.use(cors(corsOptions));
app.use(cors());

app.set('view engine', 'ejs');

// Authorization middleware
// app.use(function (req: Request, res: Response, next: NextFunction) {
//     // Check header or URL
//     let token = req.headers['authorization'];
//     if (!token) return next(); // If no token, continue
// 
//     if (req.headers.authorization?.indexOf('Basic ') === 0) {
//         // Verify auth basic credentials
//         const base64Credentials = req.headers.authorization.split(' ')[1];
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//         const [username, password] = credentials.split(':');
// 
//         req.body.username = username;
//         req.body.password = password;
// 
//         return next();
//     }
//     token = token.replace('Bearer ', '');
//     // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
//     jwt.verify(token, process.env.JWT_SECRET as string, function (err: any, user: any) {
//         if (err) {
//             return res.status(401).json({
//                 error: true,
//                 message: "Invalid user."
//             });
//         } else {
//             (req as any).user = user; // Temporarily cast req as any
//             (req as any).token = token;
//             next();
//         }
//     });
// });

// DB
dbInit( true ).then();

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to SchoolTimetable application." })
});

initApiRoutes(app);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
