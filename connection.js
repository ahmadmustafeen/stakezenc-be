const mysql = require("mysql");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stakezenc",
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
