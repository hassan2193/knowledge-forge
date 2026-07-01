const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const { normalizeUrl } = require("../utils/normalizeUrl");
const {
  isValidDocumentationFile,
} = require("../utils/isValidDocumentationFile");

const crawlSitemap = async (config) => {
  try {
    const response = await axios.get(config.sitemap);

    const parser = new XMLParser();

    const data = parser.parse(response.data);

    if (!data.urlset || !data.urlset.url) {
      return [];
    }

    const uniqueUrls = new Set();

    for (const item of data.urlset.url) {
      const url = normalizeUrl(item.loc);

      if (!isValidDocumentationFile(url)) {
        continue;
      }

      uniqueUrls.add(url);
    }

    console.log(`Found ${uniqueUrls.size} URLs`);

    return [...uniqueUrls];
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

module.exports = {
  crawlSitemap,
};
