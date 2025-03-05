const Note = require("../models/note.model"); 


exports.createNote = async (req, res) => {
  try {
    const { title,category, desc } = req.body;

    if (!title || !desc || !category) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    if (typeof title !== "string" || typeof desc !== "string" || typeof category !== "string") {
      return res.status(400).json({ error: "Invalid data!" });
    }

    const user = req.user;
   

 

    const newNote = new Note({
      title,
      desc,   
      category,
      authorId: user._id,
     
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


