//MySQL setup
const mysql = require("mysql");

if(process.env.JAWSDB_URL){
    conn = mysql.createConnection(process.env.JAWSDB_URL);
} else{
    conn = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burger_db"
    });
}



// Setup connection.
conn.connect((err) => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    };
    console.log(`Connected as id ${conn.threadId}`);
});

module.exports = conn;