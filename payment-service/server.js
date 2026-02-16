const express = require('express');
const app = express();
app.use(express.json());

// Dummy payment processing
app.post("/pay", (req, res) => {
    const { orderId, amount } = req.body;

    res.json({
        message: "Payment successful",
        orderId: orderId,
        amount: amount,
        status: "Paid"
    });
});

app.listen(3004, () => {
    console.log("Payment Service running on port 3004");
});
