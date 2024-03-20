const CharacterClass = require("../middleware/characterClassModelMiddleware");
const factory = require("./handlerFactory");

exports.getCharacterClass = factory.getOneByName(CharacterClass);
exports.getAllCharacterClasses = factory.getAll(CharacterClass);
