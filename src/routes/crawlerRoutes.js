const express = require("express");
const router = express.Router();

const { crawl } = require("../controllers/crawlerController");

router.post("/crawl", crawl);

module.exports = router;
