const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next)=>{
    let token = req.headers.authorization
    if(token){
        try {
            let decoded = jwt.verify(token.split(" ").slice(1).join(""),process.env.json_secret_key);
            if(decoded){
                req.body.userID = decoded.userID;
                next();
            }else{
                res.status(200).send({msg:"Please Log in first"})
            }
        } catch (error) {
            res.status(400).send({err:error})
        }
    }else{
        res.status(200).send({msg:"Please Log in first"})
    }
};

module.exports = {authMiddleware}