const { crawlSitemap } = require("./sitemapCrawler");
const crawlerSources = require("../data/crawlerSources");

const crawlWebsite = async (source) => {
  const config = crawlerSources[source];

  if (!config) {
    throw new Error("Unsupported source");
  }

  return await crawlSitemap(config);
};

module.exports = {
  crawlWebsite,
};
