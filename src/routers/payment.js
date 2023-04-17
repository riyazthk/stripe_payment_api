const express = require("express");
var router = new express.Router();
const stripe = require("stripe")(
  "sk_test_51MxlJlDU0aTyl47m4CERAvlD79w0wrosZOJIeGcEYUCSiW0xkWTZNFtldZ6rWgxx97Cs19JK4BVspWts6b4nepDz00AzJg1pBe"
);

router.post("/create_payment", async (req, res) => {
  console.log("api hit");
  //   const payment = new User(req.body);

  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer?.id },
      { apiVersion: "2022-11-15" }
    );
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
    });
    console.log(setupIntent.client_secret, ephemeralKey.secret, customer.id);
    // res.json({
    //   setupIntent: setupIntent.client_secret,
    //   ephemeralKey: ephemeralKey.secret,
    //   customer: customer.id,
    // });
    const response_payload = {
      setupIntent: setupIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };
    res.send({
      status: 200,
      message: "payment client secret key successfully created",
      data: response_payload,
    });

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1324234,
    //   currency: "usd",
    //   description: "qweqwe",
    //   payment_method_types: ["card"],
    //   statement_descriptor: "qweqweqw",
    // });

    // const clientSecret = paymentIntent;
    if (paymentIntent.id) {
      //   try {
      //     const confirmPayment = await stripe.paymentIntents.confirm(
      //       paymentIntent.id
      //       //   { payment_method: "Card" }
      //     );
      //     console.log("paymentIntent", confirmPayment);
      //   } catch (e) {
      //     console.log("paymentIntent", e);
      //   }
      //   res.send({
      //     status: 200,
      //     message: "payment client secret key successfully created",
      //     data: clientSecret,
      //   });
    }
  } catch (e) {
    res.send({
      status: 401,
      message: e,
      data: e,
    });
  }
});

module.exports = router;
