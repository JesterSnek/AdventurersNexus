const Background = require("../models/backgroundModel");
const factory = require("./handlerFactory");

exports.getBackground = factory.getOneByName(Background);
exports.getAllBackgrounds = factory.getAll(Background);
