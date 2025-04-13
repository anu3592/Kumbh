const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: Number,
    name: String,
    contact: Number,
    email: String,
    zip: Number,
    address: String,
    products: [String],
    quantity: [Number],
    isPaid: String,
    status: String,
    ownerEmail: String
});

module.exports = mongoose.model('orders', orderSchema);