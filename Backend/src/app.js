const express = require("express");
const cors = require("cors");

const getHtmlRoutes = require("./routes/getHtmlRoutes");
const chatRoutes = require("./routes/chatRoutes");
const importRoutes = require("./routes/importRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/knowledge", knowledgeRoutes);
app.use("/api", getHtmlRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", importRoutes);

app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);

module.exports = app;