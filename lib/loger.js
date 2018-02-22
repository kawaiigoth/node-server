const winston = require('winston');
const config = require('../lib/cfg.js');
const ENV = process.env.NODE_ENV || config.get('NODE_ENV');
const time = () => (new Date()).toLocaleTimeString();
const logDirectory = '../logs';
const fs = require('fs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logger = new (winston.Logger)({
    transports:[
        new winston.transports.Console({
            colorize: true,
            timestamp: time,
            level: ENV === 'development' ? 'debug' : 'info',
        }),
        new winston.transports.File({
            filename: `${logDirectory}/info.log`,
            timestamp: time,
            level: "info",
        })
    ]
});

module.exports = logger;