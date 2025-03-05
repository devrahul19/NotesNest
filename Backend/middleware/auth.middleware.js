const express = require('express');
const app = express();
app.use(express.json());
const User = require("../models/user.model");
require('dotenv').config
const jwt = require('jsonwebtoken');

// const authenticationToken = (req, res, next)=>{
//     const token = req.cookie['token'];

//     jwt.verify(token,process.env.SECRET_KEY,async(err,result)=>{
//         if(result){
//             const user = await User.findById(result.id);
//             if(user){
//             req.user = user;
//             }else{
//                 return res.status(400).json("not verified");
//             }
//         }
//     });
// }


const authenticationToken = async (req, res, next) => {
    // Declare token variable at the top of the function scope
    let token;
    
    try {
        // Get token from either cookies or authorization header
        token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required. No token provided." });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // Get user
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // console.error('Auth Error Details:', {
        //     errorName: error.name,
        //     errorMessage: error.message,
        //     tokenExists: !!token
        // });
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token format" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        
        return res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = authenticationToken;
