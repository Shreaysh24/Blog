
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username:String,
    Password:String
})

module.exports = mongoose.model("user",userSchema)