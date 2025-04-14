const Comments = require("../models/comment.model");
const Notes = require("../models/note.model");

exports.addComments = async (req, res) => {
  const user = req.user;
  const { NoteId } = req.params;
  const {text} = req.body;

  try {
    if(!user) return res.status(400).json({message:"not Authorized "})
    if (!text || !NoteId)
      return res.status(400).json({ message: "Please provide relevant data" });
    const Note = await Notes.findOne({ _id: NoteId });
    if (!Note)
      return res.status(404).json({ message: "No Note found to be commented" });

    const newComment = new Comments({
      userId: user.id,
      NoteId: Note.id,
      text: text,
    });
    await newComment.save();

    // Populate user info before sending response
    const populatedComment = await Comments.findById(newComment._id)
      .populate('userId', 'username');

    return res.status(201).json({ 
      message: "Comment added Successfully",
      comment: populatedComment 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error!"});
  }
};

exports.getComments = async (req, res) => {
  try {
    const { NoteId } = req.params;
    
    // Find all comments for this note and populate user info
    const comments = await Comments.find({ NoteId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: true, 
      comments 
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
