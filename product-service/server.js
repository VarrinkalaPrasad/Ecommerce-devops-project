const express = require('express');
const app = express();
app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Mobile", price: 400 }
];

// Get products
app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(3002, () => {
    console.log("Product Service running on port 3002");
});
