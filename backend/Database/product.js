const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:String,
    category:String,
    price:Number,
    desc:String,
    img:{
        data:Buffer,
        contentType:String
    }
});

module.exports = mongoose.model('products', productSchema);