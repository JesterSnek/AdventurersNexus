const express = require("express");
const characterController = require("../controllers/characterController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//Auth required for below routes
router.use(requireAuth);

router.post(
  "/createCharacter",
  characterController.setUserId,
  characterController.detectBackgroundType,
  characterController.detectRaceType,
  characterController.detectCharacterClassType,
  characterController.createCharacter
);
//router.get("/getCharacter/:id", characterController.getCharacter);

router.get("/", characterController.getAllCharacters);

module.exports = router;
