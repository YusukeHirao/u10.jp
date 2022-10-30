require("dotenv").config();
const { createClient } = require("microcms-js-sdk");

const client = createClient({
  serviceDomain: "u10",
  apiKey: process.env.MICRO_CMS_API_KEY,
});

module.exports = async function () {
  const speaks = await client.get({
    endpoint: "speaks",
    queries: {
      orders: "-date",
      limit: 1000,
    },
  });

  return {
    speaks,
  };
};
