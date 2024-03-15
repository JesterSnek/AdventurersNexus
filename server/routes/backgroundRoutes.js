const express = require("express");
const backgroundController = require("../controllers/backgroundController");

const router = express.Router();

router.get("/:name", backgroundController.getBackground);
router.get("/", backgroundController.getAllBackgrounds);

module.exports = router;
