const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.getAllOwned = (Model) =>
  catchAsync(async (req, res, next) => {
    const user_id = req.user._id;
    //console.log(user_id);
    const docs = await Model.find({ user_id });

    res.status(200).json({
      status: "success",
      results: docs.length,
      docs,
    });
  });