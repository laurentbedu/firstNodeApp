const express = require("express");
const app = express();

const db = require("./api/services/database.service")

app.get('/', async (req, res) => {
    const start = new Date();
    const result = await db.query("SHOW tables ;");
    const stop = new Date();
    const duration = stop.getTime() - start.getTime();
    res.json({duration, result});
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