const express = require("express");
const router = express.Router();
const {createNote, getAllNotes} = require("../controllers/note.controller");
const authenticationToken = require('../middleware/auth.middleware')
router.post("/",authenticationToken,createNote);
router.get("/",authenticationToken, getAllNotes);

module.exports = router;
