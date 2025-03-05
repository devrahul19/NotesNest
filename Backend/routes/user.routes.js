const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticationToken = require("../middleware/auth.middleware");

router.post("/signup", userController.userSignIn);
router.post("/login", userController.login);
router.post("/update/:id", authenticationToken, userController.updateUser);
router.delete("/delete/:id",authenticationToken, userController.deleteUser);
router.get("/getuser", authenticationToken, userController.getUser);
module.exports = router;
