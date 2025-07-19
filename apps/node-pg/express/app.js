import express, { json } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tourFilePath = `${__dirname}/dev-data/data/tours-simple.json`;

const baseApiUrl = "/api/v1";
const PORT = 3000;

const app = express();

app.use(morgan("dev"));

app.use(json());

app.use((_req, _res, next) => {
  console.log("Custom Middleware");
  next();
});

const apiRouter = express.Router();

app.use(baseApiUrl, apiRouter);

const tours = JSON.parse(fs.readFileSync(tourFilePath));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find(t => t.id === id);

  if (!tour) {
    res.status(404).json({ status: "failed", message: "Invalid ID" });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(tourFilePath, JSON.stringify(tours), err => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to create",
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};
const updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex(t => t.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({ status: "failed", message: "Invalid ID" });
  }

  tours[tourIndex] = { ...tours[tourIndex], ...req.body };

  fs.writeFile(tourFilePath, JSON.stringify(tours), err => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to update",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour: tours[tourIndex],
      },
    });
  });
};
const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return res.status(404).json({ status: "failed", message: "Invalid ID" });
  }

  const updatedTours = tours.filter(t => t.id !== id);

  fs.writeFile(tourFilePath, JSON.stringify(updatedTours), err => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to delete",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
      message: `Tour with id ${id} deleted successfully.`,
    });
  });
};

// apiRouter.get("/tours", getAllTours);
// apiRouter.post("/tours", createTour);
// apiRouter.get("/tours/:id", getTour);
// apiRouter.patch("/tours/:id", updateTour);
// apiRouter.delete("/tours/:id", deleteTour);

// we can use app itself too,
// app.route() ...

apiRouter.route("/tours").get(getAllTours).post(createTour);
apiRouter.route("/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
