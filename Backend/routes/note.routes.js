const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNote,
  generateShareableLink,
  getSharedNote,
  disableSharing
} = require("../controllers/note.controller");
const { addComments, getComments } = require("../controllers/comment.controller");
const authenticationToken = require("../middleware/auth.middleware");


const upload = require('../middleware/multer')

router.post("/create",upload.single('file'), authenticationToken, createNote);
router.get("/allnotes", authenticationToken, getAllNotes);
router.get("/:id", authenticationToken, getNoteById);
router.get("/:NoteId/comments", authenticationToken, getComments);
router.post("/:NoteId/comments", authenticationToken, addComments);
router.delete("/:id", authenticationToken, deleteNote);
router.post("/:id/share-link", authenticationToken, generateShareableLink);
router.get("/shared/:shareableLink", getSharedNote);
router.delete("/:id/share-link", authenticationToken, disableSharing);

module.exports = router;
