const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    email: {type: String, required: true},
    quantity: {type: Number, require: true},
    img:  {type: String, required: true}
}, {timestamps: true});

cartSchema.index({title: 1, email: 1}, {unique: true});

module.exports = mongoose.model('carts', cartSchema);