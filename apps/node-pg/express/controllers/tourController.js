import Tour from "./../models/tour/tourModel.js";
import ApiFeatures from "./api/api-features.js";

const aliasTopFiveCheap = (req, res, next) => {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.get("host")}`);
  url.searchParams.set("perPage", "5");
  url.searchParams.set("sort", "-ratingsAverage,price");
  url.searchParams.set(
    "fields",
    "name,price,ratingsAverage,summary,difficulty"
  );
  req.url = url.pathname + url.search;
  next();
};

const getAllTours = async (req, res) => {
  try {
    const feature = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await feature.query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    await Tour.findOneAndDelete({ _id: req.params.id });

    res.status(204).json({
      status: "success",
      data: deleteTour,
      message: `Tour with id ${req.params.id} deleted successfully.`,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export default {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFiveCheap,
};
