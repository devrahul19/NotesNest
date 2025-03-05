const express = require('express');
const app = express();
app.use(express.json());
const User = require("../Models/userModel");
require('dotenv').config

const authenticationToken = ()=>{
    const token = req.cookie['token'];

    jwt.verify(token,process.env.SECRET_KEY,async(err,result)=>{
        if(result){
            const user = await User.findById(result.id);
            if(user){
            req.user = user;
            }else{
                return res.status(400).json("not verified");
            }
        }
    });
}

module.exports = authenticationToken;