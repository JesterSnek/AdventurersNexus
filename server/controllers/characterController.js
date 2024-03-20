const Character = require("../middleware/characterModelMiddleware");
const Background = require("../middleware/backgroundModelMiddleware");
const Race = require("../middleware/raceModelMiddleware");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const CharacterClassModel = require("../middleware/characterClassModelMiddleware");
const mergeObjects = require("../utils/mergeObjects");

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
    req.body.background = mergeObjects(foundBackground._doc, background);
  } else {
    background.isCustom = true;
  }
  next();
});

exports.detectRaceType = catchAsync(async (req, res, next) => {
  const { race } = req.body;

  const foundRace = await Race.findOne({ name: race.name });

  if (foundRace) {
    req.body.race = foundRace;
  } else {
    race.isCustomRace = true;
  }
  next();
});

exports.detectCharacterClassType = catchAsync(async (req, res, next) => {
  const { characterClass } = req.body;

  const foundCharacterClass = await CharacterClassModel.findOne({
    name: characterClass.name,
  });

  if (foundCharacterClass) {
    req.body.characterClass = mergeObjects(
      foundCharacterClass._doc,
      characterClass
    );
  } else {
    characterClass.isCustomClass = true;
  }
  next();
});
