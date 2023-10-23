const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:{type:String, select:false},
    createdAt:{type:Date, default: Date.now()}
})
exports.User = mongoose.model('User', userSchema);