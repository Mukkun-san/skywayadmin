/**
 * This file sets a proxy path to the backend api whenever the /api is called.
 */


const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4545/',
      changeOrigin: true,
    })
  );
};