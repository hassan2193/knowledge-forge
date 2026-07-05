const express = require("express");

const getHtmlRoutes = require("./routes/getHtmlRoutes");
const chatRoutes = require("./routes/chatRoutes");
const importRoutes = require("./routes/importRoutes");

const app = express();

app.use(express.json());

app.use("/api", getHtmlRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", importRoutes);

module.exports = app;
