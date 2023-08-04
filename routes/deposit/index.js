const express = require("express");
const { onLogin, onRegister } = require("./services");

const app = express();

app.post("/user", onLogin);
app.post("/create", onRegister);

module.exports = app;
