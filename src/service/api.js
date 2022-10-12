const axios = require("axios");

const host = "https://www.boredapi.com/api";

const api = axios.create({
  baseURL: host,
});

module.exports = api;
