const Background = require("../middleware/backgroundModelMiddleware");
const factory = require("./handlerFactory");

exports.getBackground = factory.getOneByName(Background);
exports.getAllBackgrounds = factory.getAll(Background);
