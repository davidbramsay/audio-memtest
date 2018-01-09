const route = require('./routes');

module.exports = function(app, db) {
  route(app, db);
};
