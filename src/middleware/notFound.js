const HTTP_STATUS = require('../constants/httpStatus');
const MESSAGES = require('../constants/messages');

const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    mensaje: `${MESSAGES.ROUTE_NOT_FOUND}: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFoundHandler;
