const express = require("express");
const characterController = require("../controllers/characterController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//Auth required for below routes
//router.use(requireAuth);
router.post(
  "/createCharacter",
  requireAuth,
  characterController.setUserId,
  characterController.detectBackgroundType,
  characterController.createCharacter
);
//router.get("/getCharacter/:id", characterController.getCharacter);

router.get("/", requireAuth, characterController.getAllCharacters);

module.exports = router;
