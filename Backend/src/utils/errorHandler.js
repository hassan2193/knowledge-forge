const handleError = (error) => {
  console.error(error);

  if (error.response) {
    return error.response.data?.message || error.message;
  }

  if (error.code) {
    return error.code;
  }

  return error.message || "Internal Server Error";
};

module.exports = {
  handleError,
};
