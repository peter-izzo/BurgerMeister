//MySQL setup
const mysql = require("mysql");

conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burger_db"
});

// Setup connection.
conn.connect((err) => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    };
    console.log(`Connected as id ${conn.threadId}`);
});

module.exports = conn;