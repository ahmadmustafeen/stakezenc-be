const mysql = require("mysql2");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_stakezenc",
  password: "Bf62xwj&k$Q?@hG",
  enableKeepAlive: true,
  database: "freedb_stakezenc",
});

// Connect to MySQL
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL: ", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = connection;
