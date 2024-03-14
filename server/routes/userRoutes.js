const express = require("express");
//const characterController = require("../controllers/characterController");
//const requireAuth = require("../middleware/requireAuth");

// controller functions
const { loginUser, registerUser } = require("../controllers/userController");

const router = express.Router();

//login route
router.post("/login", loginUser);

//register route
router.post("/register", registerUser);

//Auth required for below routes
//router.use(requireAuth);
// router.post("/createCharacter", characterController.createCharacter);
// router.get("/getCharacter/:id", characterController.getCharacter);
// router.get("/", characterController.getAllCharacters);

module.exports = router;
