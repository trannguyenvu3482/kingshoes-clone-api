const home = require('./handlers/home');

module.exports = (app) => {
  app.get('/', home);
};
