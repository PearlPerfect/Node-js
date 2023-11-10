const mongoose = require('mongoose');
const { isEmail} = require("validator")
const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type: String,   
        required: [true, "Username is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already in use try another email"],
        lowercase: true ,
        validate: [isEmail, "Enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "field cannot be empty"],
        minlength: [7, "password length must not be less than 7"],
    },

}, {timestamps:true});



const postSchema = new schema({
    user:{
        type: schema.Types.ObjectId, ref: "User"
    },
    title:{
        type: String,   
        required: true
    },
    body:{
        type: String,   
        required: true
    }
}, {timestamps:true});

const commentSchema = new schema({
    user:{
        type: schema.Types.ObjectId, ref: "User"
    },
    post:{
        type: schema.Types.ObjectId, ref: "Post"
    },
    comment:{
        type: String,   
        required: true
    }
}, {timestamps:true})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {User, Post, Comment}