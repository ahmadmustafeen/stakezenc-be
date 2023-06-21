const express = require("express");
const { onLogin, onRegister } = require("./services");

const app = express();

app.post("/login", onLogin);
app.post("/register", onRegister);

module.exports = app;
