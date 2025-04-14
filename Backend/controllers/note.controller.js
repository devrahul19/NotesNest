const Note = require("../models/note.model"); 
const cloudinary = require('../utils/cloudinary')


exports.createNote = async (req, res) => {
  try {
    const { title,category, desc } = req.body;
    console.log(req.body);

    if (!title || !desc || !category) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    if (typeof title !== "string" || typeof desc !== "string" || typeof category !== "string") {
      return res.status(400).json({ error: "Invalid data!" });
    }

    const user = req.user;
   let url = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          resource_type: 'raw'
        })
        .then((resut)=>{
          console.log("uploaded successfully")
          console.log(resut);
          return resut;
        })
        .catch((error) => {
          console.log(error);
        });
  
      url = uploadResult.secure_url;
    }
 

    const newNote = new Note({
      title,
      desc,   
      category,
      authorId: user._id,
      pdfUrl: url
     
    });

    await newNote.save();

    return res.status(201).json({
      message: "New Note created successfully!",
      note: newNote,
    });
  } catch (error) {
    console.error("Error creating Note:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("authorId", "username email");
    return res.status(200).json({ message: "All Notes", notes });
  } catch (error) {
    console.error("Error fetching Notes:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id).populate("authorId", "username email");
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json({ message: "Note found", note });
  } catch (error) {
    console.error("Error fetching Note by ID:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if user owns the note
    if (note.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
};


