// Import required packages
const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./connection");
const Queries = require("./constants");
const Auth = require("./routes/auth");
const Withdrawal = require("./routes/withdrawal");
const Support = require("./routes/support");
// Create an Express application
const app = express();

// Add the body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", Auth);
app.use("/withdrawal", Withdrawal);
app.use("/support", Support);

// Define a route
app.get("/", (req, res) => {
  connection.query(Queries.ROI_PERCENTAGE_QUERY, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: ", error);
      res.status(500).send("Error executing MySQL query");
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.get("*", (req, res) => res.status(404).send("Not Found"));

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
