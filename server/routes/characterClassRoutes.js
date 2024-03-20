const express = require("express");
const characterClassController = require("../controllers/characterClassController");

const router = express.Router();

router.get("/:name", characterClassController.getCharacterClass);
router.get("/", characterClassController.getAllCharacterClasses);

module.exports = router;
