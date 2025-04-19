const express = require('express');
const { verifyPayment, createOrder, createPaymentLink } = require('../controllers/payments.controller');
const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);
router.post('/createPaymentLink', createPaymentLink);

module.exports = router;
