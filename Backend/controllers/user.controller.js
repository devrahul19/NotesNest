const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.userSignIn = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const userExists = await
        User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        }
        );
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const
        user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 360000
        });
        res.json({ message: 'Login successful' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateUser = async(req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteUser=async (req,res)=> {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
}
};