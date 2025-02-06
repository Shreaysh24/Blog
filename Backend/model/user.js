
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    userName:String,
    Password:String
})

module.exports = mongoose.model("user",userSchema)