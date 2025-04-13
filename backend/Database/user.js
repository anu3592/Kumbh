const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    contact: Number,
    address:String,
    password:String,
});

module.exports = mongoose.model('users',userSchema);