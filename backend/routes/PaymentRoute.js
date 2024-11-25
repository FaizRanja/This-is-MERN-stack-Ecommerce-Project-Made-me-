const express=require("express")

const router=express.Router()

const { isAuthenticated} = require('../middleware/auth');
const { processPayment, sendStripeApikey } = require("../Controllar/PaymentControllar");


router.route("/payment/process").post(isAuthenticated,processPayment)

router.route("/stripeapikey").get(sendStripeApikey)
module.exports=router