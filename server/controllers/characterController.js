const Character = require("../middleware/characterModelMiddleware");
const Background = require("../models/backgroundModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.createCharacter = factory.createOne(Character);
exports.getCharacter = factory.getOne(Character);
exports.getAllCharacters = factory.getAllOwned(Character);

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user_id = req.user.id;

  next();
};

exports.detectBackgroundType = catchAsync(async (req, res, next) => {
  const { background } = req.body;

  const foundBackground = await Background.findOne({ name: background.name });

  if (foundBackground) {
    req.body.background = foundBackground;
  } else {
    background.isCustom = true;
  }
  // Add language logic later
  next();
});
