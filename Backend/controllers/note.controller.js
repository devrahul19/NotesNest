const Notes = require("../models/note.model"); 


exports.createNote = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    if (typeof title !== "string" || typeof desc !== "string") {
      return res.status(400).json({ error: "Invalid data!" });
    }

    const user = req.user;
   

 

    const Note = new Notes({
      title,
      desc,
      authorId: user._id,
     
    });

    await Note.save();

    return res.status(201).json({
      message: "New Note created successfully!",
      Note,
    });
  } catch (error) {
    console.error("Error creating Note:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const Notes = await Notes.find().populate("authorId", "username email");
    return res.status(200).json({ message: "All Notes", Notes });
  } catch (error) {
    console.error("Error fetching Notes:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
