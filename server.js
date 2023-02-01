const express = require("express");
const app = express();

const db = require("./api/services/database.service")

app.get('/', (req, res) => {
    db.connect();
    res.send("OK");
});

app.get('/test', (req, res) => {
    res.send("test");
});

app.get("*", (req, res) => {
    res.send("*");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});