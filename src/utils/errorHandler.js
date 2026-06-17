const handleError = (error) => {
  if (error.code === "ENOTFOUND") {
    return "Website not reachable";
  }

  if (error.code === "ECONNREFUSED") {
    return "Connection refused";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timeout";
  }

  return error.message || "Internal Server Error";
};

module.exports = {
  handleError,
};
