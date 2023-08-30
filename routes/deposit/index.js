const express = require("express");
const { fetchDeposits, createDeposit } = require("./services");
const multer = require("multer");

const upload = multer();

const app = express();

app.post("/user", fetchDeposits);
app.post("/create", upload.single("file"), createDeposit);

module.exports = app;
