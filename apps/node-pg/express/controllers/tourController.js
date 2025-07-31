import Tour from "../models/tour/tourModel";

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const getTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      // tour,
    },
  });
};
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({ ...req.body });

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};
const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      // tour: tours[tourIndex],
    },
  });
};
const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
    message: `Tour with id ${id} deleted successfully.`,
  });
};

export default {
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
