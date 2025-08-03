import Tour from "./../models/tour/tourModel.js";

const getAllTours = async (req, res) => {
  try {

    const queryParams = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "field"];

    excludeFields.forEach(q => delete queryParams[q]);

    const query = Tour.find();

    /**
     * MORE CALCULATING LIKE SORTING, PAGE, ...
     */

    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
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
};
