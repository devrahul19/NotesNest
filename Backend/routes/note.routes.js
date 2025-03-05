const express = require("express");
const router = express.Router();
const {createNote, getAllNotes, getNoteById} = require("../controllers/note.controller");
const authenticationToken = require('../middleware/auth.middleware')
router.post("/create",authenticationToken,createNote);
router.get("/allnotes",authenticationToken, getAllNotes);
router.get("/:id",authenticationToken, getNoteById);

module.exports = router;
