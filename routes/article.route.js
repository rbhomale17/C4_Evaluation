const express = require("express");
const { UserModel } = require("../models/user.model");
const articleRouter = express.Router();
const bcrypt = require("bcrypt");
const { loginMiddleware } = require("../middlware/login.middleware");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlware/auth.middleware");
const { BlogModel } = require("../models/article.model");

articleRouter.get("/",authMiddleware,async(req,res)=>{
    const {page,limit} = req.query;
    // console.log(page,limit);
    try {
        if(!page && !limit){
            let articles = await UserModel.findById(req.body.userID).populate("articles");
            res.send({articles:articles.articles})
        }else{
            let skipped = (+page* +limit - +limit);
            let articles = await BlogModel.find({userID:req.body.userID}).skip(skipped).limit(limit)
            res.send({articles:articles})
        }
    } catch (error) {
        res.send({err:error.message})
    }
});

articleRouter.post("/add",authMiddleware,async(req,res)=>{
   try {
    await BlogModel.insertMany([req.body]).then(async(blog,err)=>{
        let user = await UserModel.findById(req.body.userID);
        user.articles.push(blog[0]._id);
        await UserModel.findByIdAndUpdate(req.body.userID,user)
        res.send({msg:"Article is Added."})
    })
   } catch (error) {
    res.send({err:error.message})
   }
})

// PUT/PATCH /articles/edit/:id: Updates a specific article.
articleRouter.patch("/edit/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        await BlogModel.findByIdAndUpdate(id,req.body);
        res.send({msg:"Article Updated"});
    } catch (error) {
        res.send({err:error.message})
    }
})
// DELETE /articles/rem/:id: Deletes a specific article.
articleRouter.delete("/rem/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        let article = await BlogModel.findById(id);
        await BlogModel.findByIdAndDelete(id,req.body);
        let user = await UserModel.findById(article.userID);
        // console.log(user.articles)
        user.articles = user.articles.filter((ele,ind) =>{
            // console.log(ele.id)
            // console.log(ele.id==article._id);
            if(ele.ObjectId != id){
                return true;
            }
        });
        console.log(user.articles,article._id)
        await UserModel.findByIdAndUpdate(article.userID,user)
        res.send({msg:"Article deleted"});
    } catch (error) {
        res.send({err:error.message})
    }
})


articleRouter.get("/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        let article = await BlogModel.findById(id);
        res.send(article);
    } catch (error) {
        res.send({err:error.message})
    }
})

module.exports = {articleRouter}