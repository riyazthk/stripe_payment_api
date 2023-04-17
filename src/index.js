var express = require("express");

const paymentRouter = require("./routers/payment");

var port = process.env.PORT || 3000;
var app = express();

app.use(express.json());
app.use(paymentRouter);

app.all("*", (req, res) => {
  res.send({
    error: 404,
    message: "404 not found",
  });
});

app.listen(port, () => {
  console.log("server is up");
});
