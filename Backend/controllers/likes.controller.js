const Like = require("../models/like.model"); 

exports.likeNote = async (req, res) => {
  try {
    const currentUser = req.user;
    const noteID = req.params.id;

    // Check if like already exists
    const existingLike = await Like.findOne({
      noteID: noteID,
      userID: currentUser._id,
    });

    if (existingLike) {
      // If already liked, remove like (toggle)
      await Like.deleteOne({ _id: existingLike._id });
      const totalLikes = await Like.countDocuments({ noteID });
      return res.status(200).json({ message: "Like removed", totalLikes });
    }

    // Create new like
    const newLike = new Like({
      noteID,
      userID: currentUser._id,
    });

    await newLike.save();

    const totalLikes = await Like.countDocuments({ noteID });
    return res.status(200).json({ message: "Note liked", totalLikes });
  } catch (error) {
    console.error("Error liking note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add new method to get likes count
exports.getLikes = async (req, res) => {
  try {
    const noteID = req.params.id;
    const totalLikes = await Like.countDocuments({ noteID });
    const isLiked = await Like.exists({ 
      noteID, 
      userID: req.user?._id 
    });

    return res.status(200).json({ 
      totalLikes
    });
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
