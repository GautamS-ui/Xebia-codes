const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

let products = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json")));

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/order", (req, res) => {
    console.log("New order received:", req.body);
    res.json({ message: "Order placed successfully!" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
