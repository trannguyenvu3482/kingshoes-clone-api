// const jsonServer = require('json-server');
import jsonServer from 'json-server';
// const queryString = require('query-string');
import queryString from 'query-string';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  // Handle error
  if (res.locals.data.error) {
    return res.status(400).jsonp({
      code: 400,
      message: res.locals.data.error,
    });
  }

  // Handle Pagination
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      code: 200,
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };
    return res.jsonp(result);
  }

  res.jsonp({
    code: 200,
    data: res.locals.data,
  });
};
// Use default router
server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
