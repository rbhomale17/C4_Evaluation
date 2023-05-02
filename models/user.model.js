const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: {type:String,required:true},
    email:  {type:String,unique:true,required:true},
    password: {type:String,required:true},
    city: {type:String,required:true},
    age: {type:Number,required:true},
    articles: [{type:mongoose.Schema.Types.ObjectId,ref:"blog"}]
});

const UserModel = mongoose.model("user",UserSchema);


module.exports = {UserModel}