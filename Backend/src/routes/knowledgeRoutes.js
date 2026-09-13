const express = require("express");

const {
  generateChunks,
  generateEmbeddings,
} = require("../controllers/knowledgeController");

const router = express.Router();

router.post("/chunks", generateChunks);
router.post("/embeddings", generateEmbeddings);

module.exports = router;