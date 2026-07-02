const express = require("express");

const { importDocumentation } = require("../controllers/importController");

const router = express.Router();

router.post("/import", importDocumentation);

module.exports = router;
