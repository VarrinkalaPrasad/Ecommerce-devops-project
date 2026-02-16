const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let orders = [];

// Create order
app.post("/orders", async (req, res) => {
    try {
        const { productId } = req.body;

        // Call product service
        const productResponse = await axios.get(`http://localhost:3002/products`);
        const product = productResponse.data.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const order = {
            id: orders.length + 1,
            product: product
        };

        orders.push(order);

        // Call payment service
        const paymentResponse = await axios.post("http://localhost:3004/pay", {
            orderId: order.id,
            amount: product.price
        });

        res.json({
            order,
            payment: paymentResponse.data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

app.listen(3003, () => {
    console.log("Order Service running on port 3003");
});

