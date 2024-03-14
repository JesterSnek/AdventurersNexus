const Character = require("../middleware/characterModelMiddleware");
const factory = require("./handlerFactory");

exports.createCharacter = factory.createOne(Character);
exports.getCharacter = factory.getOne(Character);
exports.getAllCharacters = factory.getAllOwned(Character);

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user_id = req.user.id;

  next();
};
