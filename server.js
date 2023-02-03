const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const cors = require("cors");
app.use(cors());

const db = require("./api/services/database.service")

app.get('/', async (req, res) => {
    const start = new Date();
    const result = await db.query("SHOW tables ;");
    const stop = new Date();
    const duration = stop.getTime() - start.getTime();
    res.json({duration, result});
});

app.get('/category', async (req, res) => {
    //récuperer toutes les lignes de la table theme
    const data = await db.query("SELECT * FROM category;");
    res.send({data, result: true, message:"Get all categories"});
});

app.get('/product', async (req, res) => {
    //récuperer toutes les lignes de la table article
    const data = await db.query("SELECT * FROM product;");
    res.send({data, result: true, message:"Get all products"});
});

app.get('/category/:id', async (req, res) => {
    //récuperer la ligne de la table theme qui a pour id:id
    const id = req.params.id;
    const data = await db.query(`SELECT * FROM category WHERE id = ${id}`);
    res.send({data, result: true, message:`Get category with id = ${id}`});
});

app.get('/product/:id', async (req, res) => {
    //récuperer la ligne de la table article qui a pour id:id
    const id = req.params.id;
    const data = await db.query(`SELECT * FROM product WHERE id = ${id}`);
    res.send({data, result: true, message:`Get product with id = ${id}`});
});

app.post("/category", async (req, res) => {
    //créer un category en db
    for(const entry in req.body){
        req.body[entry] = req.body[entry].replace(/'/g, "\\'");
    }
    const {title, description, image} = req.body;
    const data = await db.query(`INSERT INTO category (title, description, image) VALUES ('${title}', '${description}', '${image}')`);
    const inserted = {id:data.insertId, title, description, image};
    res.json({data: inserted, result: true, message: `category inserted with id = ${inserted.id}`});
});

app.post("/product", async (req, res) => {
    //créer un procuct en db
    for(const entry in req.body){
        req.body[entry] = req.body[entry].replace(/'/g, "\\'");
    }
    const {title, price, description, image, category_id} = req.body;
    const data = await db.query(`INSERT INTO product (title, price, description, image, category_id) 
                                    VALUES ('${title}', '${price}', '${description}', '${image}', '${category_id}')`);
    const inserted = {id:data.insertId, title, price, description, image, category_id};
    res.json({data: inserted, result: true, message: `product inserted with id = ${inserted.id}`});
});

app.put("/category/:id", async (req, res) => {
    //mettre à jour la category ayant l'id:id
    for(const entry in req.body){
        req.body[entry] = req.body[entry].replace(/'/g, "\\'");
    }
    const {title, description, image} = req.body;
    const id = req.params.id;
    await db.query(`UPDATE category SET title = '${title}', description = '${description}', image = '${image}' WHERE id = ${id}`);
    const updated = {id, title, description, image};
    res.json({data: updated, result: true, message: `category with id = ${id} updated`});
});

app.put("/product/:id", async (req, res) => {
    //mettre à jour la product ayant l'id:id
    //SQL UPDATE
});

app.patch("/category/:id", async (req, res) => {
    //soft delete de la category ayant l'id:id
    const id = req.params.id;
    await db.query(`UPDATE category SET is_deleted = 1 WHERE id = ${id}`);
    const data = await db.query(`SELECT * FROM category WHERE id = ${id}`);
    res.json({data, result: true, message: `category with id = ${id} deleted (soft)`});
});

app.patch("/product/:id", async (req, res) => {
    //soft delete du product ayant l'id:id
    //SQL UPDATE
});

app.delete("/category/:id", async (req, res) => {
    //hard delete de la category ayant l'id:id
    const id = req.params.id;
    await db.query(`DELETE FROM category WHERE id = ${id}`)
    .then(() => {
        res.json({data: null, result: true, message: `category with id = ${id} deleted (hard)`});
    })
    .catch(err => {
        res.json({data: null, result: false, message: err.message});
    });
    
});

app.delete("/product/:id", async (req, res) => {
    //hard delete du product ayant l'id:id
    //SQL DELETE
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});