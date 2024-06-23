const morgan = require("morgan");
const { winstonLogger } = require("../utils/winstonLogger.util");

let morganLogger= morgan('combined', {
  stream: {
    write: message => {
      const statusCode = parseInt(message.split(' ')[8]); // Extract status code from Morgan log
      if (statusCode >= 400) {
        winstonLogger.error(message.trim());
      } else {
        winstonLogger.info(message.trim());
      }
    }
  }
})

module.exports = morganLogger;