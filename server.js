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

app.get('/theme', async (req, res) => {
    //récuperer toutes les lignes de la table theme
    res.send("All themes");
});

app.get('/article', async (req, res) => {
    //récuperer toutes les lignes de la table article
    res.send("All articles");
});

app.get('/theme/:id', async (req, res) => {
    //récuperer la ligne de la table theme qui a pour id:id
    res.send("A theme with an id");
});

app.get('/article/:id', async (req, res) => {
    //récuperer la ligne de la table article qui a pour id:id
    res.send("An article with an id");
});

// app.get('/test', (req, res) => {
//     res.send("test");
// });

// app.get("*", (req, res) => {
//     res.send("*");
// });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});