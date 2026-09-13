const express = require("express");
const cors = require("cors");

const getHtmlRoutes = require("./routes/getHtmlRoutes");
const chatRoutes = require("./routes/chatRoutes");
const importRoutes = require("./routes/importRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/knowledge", knowledgeRoutes);
app.use("/api", getHtmlRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", importRoutes);

module.exports = app;