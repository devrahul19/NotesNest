const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
} = require("../controllers/note.controller");
const { addComments } = require("../controllers/comment.controller");
const authenticationToken = require("../middleware/auth.middleware");


const upload = require('../middleware/multer')

router.post("/create",upload.single('file'), authenticationToken, createNote);
router.get("/allnotes", authenticationToken, getAllNotes);
router.get("/:id", authenticationToken, getNoteById);
router.post("/:NoteId/comments", authenticationToken, addComments);

module.exports = router;
