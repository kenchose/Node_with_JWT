const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        min:2,
        max:20
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        min:6,
        max:50
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        min:6,
        max:200
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:{createdAt:"created_at", updatedAt:"updated_at"}});

module.exports = mongoose.model("User", UserSchema)