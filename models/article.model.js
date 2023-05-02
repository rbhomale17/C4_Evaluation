const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
    title: {type:String},
    body: {type:String},
    user: {type:String},
    userID: {type:mongoose.Schema.Types.ObjectId,ref:"user"},
    category:{type:String},
    live: {type:Boolean}
});

const BlogModel = mongoose.model("blog",BlogSchema);


module.exports = {BlogModel}