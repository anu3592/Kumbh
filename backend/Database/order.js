const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    contact: Number,
    zip: Number,
    address: String,
    products: [String],
    quantity: [Number],
    isPaid: String,
});

module.exports = mongoose.model('orders', orderSchema);