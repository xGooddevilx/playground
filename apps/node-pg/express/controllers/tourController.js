import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tourFilePath = `${__dirname}/../dev-data/data/tours-simple.json`;
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

const checkId = (req, res, next, val) => {
  const id = Number(val);
  if (isNaN(id) || id < 1 || id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  next();
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(t => t.id === id);

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

export default {
  checkId,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
