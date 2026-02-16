const express = require('express');
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Prasad", email: "prasad@test.com" }
];

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Add user
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(3001, () => {
    console.log("User Service running on port 3001");
});
