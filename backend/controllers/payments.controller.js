const { resourceLimits } = require("worker_threads");
const { createRazorPayInstance } = require("../config/razorpay.config");
require("../Database/config");
const Cart = require("../Database/cart");
const crypto = require('crypto');
require('dotenv').config();
const razorpayInstance = createRazorPayInstance();

exports.createOrder = async (req, res) => {

    const { courseId, amount, email } = req.body;

    let result = await Cart.find({
        "$or": [
            { email: { $regex: email } }
        ]
    });

    let price = 0;

    for(let i=0; i<result.length; i++)
    {
        price = price + (result[i].price* result[i].quantity);
    }

    if (!courseId || !amount) {
        return res.status(400).json({
            success: false,
            message: "Course id and amount is required",
        });
    }

    const options = {
        amount: price * 100,
        currency: "INR",
        receipt: `receipt_order_1`,
    };

    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
            return res.status(200).json(order);
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verifies",
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Payment not verified",
        });
    }
};