const express = require("express");
const fs = require("fs");

const tracker = (req,res,next)=>{
    fs.appendFileSync("tracker.txt",`IP Address: ${req.ip}, Method: ${req.method}, URL: ${req.url}, Date & Time: ${new Date()}\n`)    
    // res.send("hii")
    next();
}


module.exports = {tracker}