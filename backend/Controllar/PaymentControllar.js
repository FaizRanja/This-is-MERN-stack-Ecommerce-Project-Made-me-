const CathasyncError = require("../middleware/CathasyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = CathasyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ECOMMERACE",
    },
  });
  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApikey= CathasyncError(async (req, res, next) => {
res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
})

