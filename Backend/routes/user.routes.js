const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
router.post("/signup", userController.userSignIn);
router.post("/login", userController.login);
app.post("/update/:id", authenticationToken, userController.updateUser);
app.delete("/delete/:id",authenticationToken, userController.deleteUser);
module.exports = router;
