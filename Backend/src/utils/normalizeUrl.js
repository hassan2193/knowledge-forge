const normalizeUrl = (url) => {
  let normalizedUrl = url.trim();

  if (
    !normalizedUrl.startsWith("http://") &&
    !normalizedUrl.startsWith("https://")
  ) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const parsedUrl = new URL(normalizedUrl);

  // Remove trailing slash
  parsedUrl.pathname = parsedUrl.pathname.replace(/\/$/, "");

  // Remove query parameters
  parsedUrl.search = "";

  // Remove hash fragments
  parsedUrl.hash = "";

  return parsedUrl.toString();
};

module.exports = {
  normalizeUrl,
};
