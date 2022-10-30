const dayjs = require("dayjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("dateFormat", (value, format) => {
    return dayjs(value).format(format);
  });
};
