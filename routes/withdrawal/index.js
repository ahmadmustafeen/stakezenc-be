const express = require("express");
const { createWithdrawal, fetchWithdrawal } = require("./services");

const app = express();

app.post("/user", fetchWithdrawal);
app.post("/", createWithdrawal);

module.exports = app;
