import express, { json } from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRouter.js";
import userRouter from "./routes/userRouter.js";
import path from "path";
import qs from "qs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseApiUrl = "/api/v1";

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(express.static(`${__dirname}/public/`));
app.set("query parser", str => qs.parse(str));

// Routes
app.use(`${baseApiUrl}/tours`, tourRouter);
app.use(`${baseApiUrl}/users`, userRouter);

export default app;
