/**
 * This file sets a proxy path to the backend api whenever the /api is called.
 */


const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://skyway-server.herokuapp.com/',
      changeOrigin: true,
    })
  );
};