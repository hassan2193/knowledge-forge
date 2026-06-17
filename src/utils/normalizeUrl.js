const normalizeUrl = (url) => {
  let normalizedUrl = url.trim();

  // Add protocol if missing
  if (
    !normalizedUrl.startsWith("http://") &&
    !normalizedUrl.startsWith("https://")
  ) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const parsedUrl = new URL(normalizedUrl);

  // remove trailing slash from pathname
  parsedUrl.pathname = parsedUrl.pathname.replace(/\/$/, "");

  return parsedUrl.toString();
};

module.exports = {
  normalizeUrl,
};
