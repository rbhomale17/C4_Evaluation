const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { loginMiddleware } = require("../middlware/login.middleware");
require('dotenv').config();
const jwt = require("jsonwebtoken");

userRouter.get("/",(req,res)=>{
    res.send("userRouter working")
});

userRouter.post("/register",async(req,res)=>{
    let users = await UserModel.find({email:req.body.email});
    console.log(users);
    if(users.length!==0){
        res.send({msg:"user already exists!!"})
    }else{
    try {
        bcrypt.hash(req.body.password, +process.env.saltRound,async(err,hash)=>{
            req.body.password = hash;
            let user = new UserModel(req.body);
            await user.save();
            res.send({msg:"User Added"})
        })
    } catch (error) {
        res.status(400).send({err:error.message});
    }
}
})

userRouter.post("/login",loginMiddleware,async(req,res)=>{
    const {email} = req.body;
    let user = await UserModel.find({email:email})
    let token = jwt.sign({userID:user[0]._id}, process.env.json_secret_key,{expiresIn:'4h'});
    res.send({msg:"Log in Successful",token:token});
})

module.exports = {userRouter}