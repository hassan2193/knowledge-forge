const { decodeHtml } = require("../services/decodeService");
const { isValidUrl } = require("../services/validationService");
const { fetchHtml } = require("../services/fetchService");
const cache = require("../services/cacheService");
const { renderPage } = require("../services/renderService");
const { extractContent } = require("../services/extractionService");
const { handleError } = require("../utils/errorHandler");
const {
  isPrivateHost,
  resolvesToPrivateIP,
} = require("../services/securityService");
const { normalizeUrl } = require("../utils/normalizeUrl");
const { saveContent } = require("../services/contentService");
const { getSource } = require("../utils/getSource");

const getHtml = async (req, res) => {
  try {
    const { url, render } = req.query;

    // URL required check
    if (!url) {
      return res.status(400).json({
        success: false,
        error: "URL is required",
      });
    }

    const normalizedUrl = normalizeUrl(url);

    // URL validation
    if (!isValidUrl(normalizedUrl)) {
      return res.status(400).json({
        success: false,
        error: "Invalid URL",
      });
    }

    // SSRF protection
    if (isPrivateHost(normalizedUrl)) {
      return res.status(403).json({
        success: false,
        error: "Private hosts are not allowed",
      });
    }

    const hostname = new URL(normalizedUrl).hostname;

    if (await resolvesToPrivateIP(hostname)) {
      return res.status(403).json({
        success: false,
        error: "DNS resolved to a private IP",
      });
    }

    // Cache key
    const cacheKey = `${normalizedUrl}-${render}`;

    // Cache check
    const cachedContent = cache.get(cacheKey);

    if (cachedContent) {
      return res.status(200).json({
        success: true,
        source: "cache",
        contentLength: cachedContent.length,
        content: cachedContent,
      });
    }

    let html;

    // Static HTML -> Axios
    // Dynamic JS Website -> Puppeteer
    if (render === "true") {
      html = await renderPage(normalizedUrl);
    } else {
      const response = await fetchHtml(normalizedUrl);
      html = decodeHtml(response.data);
    }

    // Extract article
    const article = extractContent(html, normalizedUrl);

    if (!article.content) {
      return res.status(422).json({
        success: false,
        error: "Unable to extract content from page",
      });
    }

    const title = article.title;
    const content = article.content;
    const source = getSource(normalizedUrl);

    // Store in cache
    cache.set(cacheKey, content);

    // Save to database
    await saveContent({
      url: normalizedUrl,
      source,
      title,
      content,
      contentLength: content.length,
      render: render === "true",
    });

    return res.status(200).json({
      success: true,
      source: "network",
      title,
      contentLength: content.length,
      content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: handleError(error),
    });
  }
};

module.exports = {
  getHtml,
};
