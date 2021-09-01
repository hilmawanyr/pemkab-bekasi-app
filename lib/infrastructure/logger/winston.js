'use strict';

const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `[ ${info.timestamp} ] ${info.level}: ${info.message}`),
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;