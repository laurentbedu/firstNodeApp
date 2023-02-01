const mysql = require("mysql2/promise");

let db;
async function connect(){
    if(!db){
        db = await mysql.createConnection(
            {
                host: "localhost",
                user: "root",
                database: "mon_blog"
            }
        );
    }
    return db;
}

async function query(sql) {
    const connection = await connect();
    const [results] = await connection.query(sql);
    return results;
}

module.exports = {
    query
}