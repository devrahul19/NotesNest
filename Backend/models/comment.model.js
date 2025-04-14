const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    NoteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema);