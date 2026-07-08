const backendUrls = require("./backendUrls");
const javascriptUrls = require("./javascriptUrls");
const databaseUrls = require("./databaseUrls");

module.exports = [...backendUrls, ...javascriptUrls, ...databaseUrls];
