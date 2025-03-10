const morgan = require('morgan');

const morganMiddleware = morgan('tiny'); 

module.exports = morganMiddleware;
