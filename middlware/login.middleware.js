const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require('dotenv').config();

const loginMiddleware = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        let user = await UserModel.find({email:email});
        if(user.length!==0){
            bcrypt.compare(password,user[0].password, async(err,result)=>{
                if(err) return console.log(err);
                if(result){
                    next();
                }else{
                    res.status(200).send({msg:"Wrong Password"});
                }
            })
        }else{
            res.send({msg:"User Not Found"})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
};

module.exports = {loginMiddleware}