const express = require("express");
const router = express.Router();
const authenticationToken = require("../middleware/auth.middleware");
const likesController = require('../controllers/likes.controller');

router.post('/:id', authenticationToken, likesController.likeNote);
module.exports = router;
