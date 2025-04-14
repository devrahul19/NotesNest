const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  noteID: {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("Like", likeSchema);
