const express = require("express");

const getHtmlRoutes = require("./routes/getHtmlRoutes");
const crawlerRoutes = require("./routes/crawlerRoutes");

const app = express();

app.use(express.json());

app.use("/api", getHtmlRoutes);
app.use("/api", crawlerRoutes);

module.exports = app;
