const express = require("express");
const app = express();

app.get('/', (req, res) => {
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