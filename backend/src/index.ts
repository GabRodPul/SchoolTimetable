import express, { Request, Response } from "express";
import { DB } from "./models";
import cors from "cors";
import { UserRoutes } from "./routes/user.routes";
import { GroupRoutes } from "./routes/group.routes"

const app = express();
const corsOptions = {
    origin: 'http://localhost:8100',
};

// Config
app.use(express.json()); // content-type: application/json
app.use(express.urlencoded({ extended: true })); // content-type: application/x-www-form-urlencoded
app.use(cors(corsOptions));

// DB
DB.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
})

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to notes application." })
});

UserRoutes.init(app);

GroupRoutes.init(app);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));