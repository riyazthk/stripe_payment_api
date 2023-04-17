const express = require("express");
var router = new express.Router();
const stripe = require("stripe")(
  "sk_test_51MxlJlDU0aTyl47m4CERAvlD79w0wrosZOJIeGcEYUCSiW0xkWTZNFtldZ6rWgxx97Cs19JK4BVspWts6b4nepDz00AzJg1pBe"
);

router.post("/create_payment", async (req, res) => {
  //   const payment = new User(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1324,
      currency: "usd",
    });
    const clientSecret = paymentIntent.client_secret;
    res.send({
      status: 200,
      message: "payment client secret key successfully created",
      data: clientSecret,
    });
  } catch (e) {
    res.send({
      status: 401,
      message: e,
      data: e,
    });
  }
});

module.exports = router;
