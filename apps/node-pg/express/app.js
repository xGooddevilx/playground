import express, { json } from "express";
import morgan from "morgan";
import router from "./routes/tourRouter.js";
import userRouter from "./routes/userRouter.js";

const baseApiUrl = "/api/v1";

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use((_req, _res, next) => {
  console.log("Custom Middleware");
  next();
});

// Routes
app.use(`${baseApiUrl}/tours`, router);
app.use(`${baseApiUrl}/users`, userRouter);

export default app;
