const express = require("express");

const router = express.Router();

const { getHtml } = require("../controllers/getHtmlController");
const {
  getArticles,
  getArticle,
  search,
} = require("../controllers/articleController");
const rateLimiter = require("../middleware/rateLimiter");

router.get("/gethtml", rateLimiter, getHtml);
router.get("/articles", getArticles);
router.get("/articles/:id", getArticle);
router.get("/search", search);

module.exports = router;
