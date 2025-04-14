const Comments = require("../models/comment.model");

const Notes = require("../models/note.model");

exports.addComments = async (req, res) => {
  const user = req.user;
  const { NoteId } = req.params;
  const {text} = req.body;

  try {
    if(!user) return res.status(400).json({Message:"not Authorized "})
    if (!text || !NoteId)
      return res.status(400).json({ Message: "Please provide relevant data" });
    const Note = await Notes.findOne({ _id: NoteId });
    if (!Note)
      return res.status(404).json({ Message: "No Note found to be commented" });

    console.log(req.body)
    const newComment = new Comments({
        userId:user.id,
      NoteId: Note.id,
      text: text,
    });
    await newComment.save();

    return res.status(201).json({ Message: "Comment added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({Error: "Internal Server Error!"});
  }
};
