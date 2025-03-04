//TODO: Create a model for users
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    }
})

module.exports = mongoose.model('User', userSchema);