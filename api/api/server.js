// api/server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // or relative path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1', // rewrite /api
  }),
);
server.use(router);

module.exports = server; // Export for Vercel serverless
