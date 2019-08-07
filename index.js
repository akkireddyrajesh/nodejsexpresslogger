var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { splat, combine, timestamp, label, printf } = format;
var exports = module.exports = {};

const myFormat = printf(({ timestamp, level, message, msgData }) => {
    // preparing log formate with event level and timestamp and log message 
    let result = `[${level}] [${timestamp}] [eventRefId:${Date.now()}] message:{${message}}`;

    //log message description
    if (msgData) result += `, messageDesc :${msgData ? JSON.stringify(msgData)  : null}`;

    return result;
});


const logger = winston.createLogger({
    format: combine(
        splat(),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all_events.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true,
            timestamp: true,
        }),
        new winston.transports.Console({
            level: 'debug',
            filename: './logs/debug_events.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true,
            timestamp: true,
        })
    ],
    exitOnError: false
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

exports.info = function(msg, msgData) {
    logger.info(msg, { Description: msgData });
}
exports.err = function(msg, msgData) {
    logger.error(msg, { Description: msgData });
}