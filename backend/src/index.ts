import express, { Request, Response } from "express";
import { DB } from "./models";
import cors from "cors";
import { envvars } from "./env";
import { UserRoutes } from "./routes/user.routes";
import { GroupRoutes } from "./routes/group.routes"
import { CourseRoutes } from "./routes/course.routes";
import { initApiRoutes } from "./routes";

const furl = `http://localhost:${envvars.FEND_PORT}`;
// console.log(furl)
// const corsOptions = { origin: furl };

// Config
const app = express();
app.use(express.json()); // content-type: application/json
app.use(express.urlencoded({ extended: true })); // content-type: application/x-www-form-urlencoded
// app.use(cors(corsOptions));
app.use(cors());

// DB
DB.sequelize.sync({ force: true, alter: true }).then(() => {
    console.log("Drop and re-sync db.")
})

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to SchoolTimetable application." })
});

initApiRoutes(app);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));