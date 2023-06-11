const express = require("express");
const { onLogin } = require("./services");

const app = express();

app.get("/login", onLogin);

module.exports = app;
