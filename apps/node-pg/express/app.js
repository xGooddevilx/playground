import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseApiUrl = "/api/v1";
const PORT = 3000;

const app = express();

const apiRouter = express.Router();

app.use(baseApiUrl, apiRouter);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

apiRouter.get("/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
