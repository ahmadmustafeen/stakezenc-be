const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_stakezenc",
  password: "Bf62xwj&k$Q?@hG",
  enableKeepAlive: true,
  database: "freedb_stakezenc",
});

// Connect to MySQL
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
    connection.release();
  }
});

module.exports = db;
