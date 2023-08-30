const express = require("express");
const { fetchSupportTicket, createSupportTicket } = require("./services");

const app = express();

app.post("/fetch", fetchSupportTicket);
app.post("/create", createSupportTicket);

module.exports = app;
