import { cpSync } from "fs"

cpSync("common/", "backend/common/",  { recursive: true });
cpSync("common/", "frontend/common/", { recursive: true });
cpSync(".env", "backend/.env");
cpSync(".env", "frontend/.env");