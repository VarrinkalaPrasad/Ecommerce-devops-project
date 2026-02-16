const express = require('express');
const axios = require('axios');
const app = express();

app.get("/", async (req, res) => {
    try {
        const products = await axios.get("http://localhost:3002/products");

        let productList = products.data.map(p =>
            `<li>${p.name} - $${p.price}
                <form action="/order/${p.id}" method="post">
                    <button type="submit">Buy</button>
                </form>
            </li>`
        ).join("");

        res.send(`
            <h1>E-Commerce App</h1>
            <ul>${productList}</ul>
        `);

    } catch (err) {
        res.send("Error connecting to services");
    }
});

app.post("/order/:id", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:3003/orders", {
            productId: parseInt(req.params.id)
        });

        res.send(`<h2>Order Successful!</h2>
                  <pre>${JSON.stringify(response.data, null, 2)}</pre>
                  <a href="/">Go Back</a>`);
    } catch (err) {
        res.send("Order failed");
    }
});

app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});
