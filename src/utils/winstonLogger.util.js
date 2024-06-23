// src/utils/logger.js

const winston = require('winston');
let transports = [];
if (process.env.STAGE !== 'prod') {
  transports.push(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info'}),
  );
}
// Logger setup with winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports
});


module.exports = {winstonLogger : logger};