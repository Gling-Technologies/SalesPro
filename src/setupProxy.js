const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/macros",
    createProxyMiddleware({
      target: "https://script.google.com",
      changeOrigin: true,
      followRedirects: true,
    })
  );
};
