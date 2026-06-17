const express = require("express");

const getHtmlRoutes = require("./routes/getHtmlRoutes");

const app = express();

app.use(express.json());

app.use("/api", getHtmlRoutes);

module.exports = app;
