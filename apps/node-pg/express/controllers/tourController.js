import Tour from "./../models/tour/tourModel.js";

const getAllTours = async (req, res) => {
  try {
    const queryParams = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "perPage", "fields"];

    excludeFields.forEach(q => delete queryParams[q]);

    const queryString = JSON.stringify(queryParams).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("name price");
    }

    const page = req.query.page * 1 || 1;
    const perPage = req.query.perPage * 1 || 100;

    const skip = (page - 1) * perPage;

    if (req.query.page) {
      const tourLength = await Tour.countDocuments();
      if (skip >= tourLength) throw new Error("This page does not exits");
    }

    query = query.skip(skip).limit(perPage);

    const tours = await query;

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
};
