const { fetchHtml } = require("./fetchService");
const { decodeHtml } = require("./decodeService");
const { extractContent } = require("./extractionService");
const { saveContent, getAllUrls } = require("./contentService");

const { normalizeUrl } = require("../utils/normalizeUrl");
const { getSource } = require("../utils/getSource");

const importResources = async (urls) => {
  const existingUrls = new Set(await getAllUrls());

  let saved = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const normalizedUrl = normalizeUrl(urls[i]);

    if (existingUrls.has(normalizedUrl)) {
      skipped++;

      console.log(`[${i + 1}/${urls.length}] Skipped: ${normalizedUrl}`);

      continue;
    }

    try {
      console.log(`[${i + 1}/${urls.length}] Processing: ${normalizedUrl}`);

      const response = await fetchHtml(normalizedUrl);

      const html = decodeHtml(response.data);

      const article = extractContent(html, normalizedUrl);

      if (!article.content) {
        failed++;

        console.log(`[${i + 1}/${urls.length}] No content`);

        continue;
      }

      await saveContent({
        url: normalizedUrl,
        source: getSource(normalizedUrl),
        title: article.title || normalizedUrl,
        content: article.content,
        contentLength: article.content.length,
        render: false,
      });

      existingUrls.add(normalizedUrl);

      saved++;

      console.log(`[${i + 1}/${urls.length}] Saved`);
    } catch (error) {
      failed++;

      console.log(`[${i + 1}/${urls.length}] Failed: ${error.message}`);
    }
  }

  return {
    totalUrls: urls.length,
    saved,
    skipped,
    failed,
  };
};

module.exports = {
  importResources,
};
