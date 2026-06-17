const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL) || 300,
});

module.exports = cache;
