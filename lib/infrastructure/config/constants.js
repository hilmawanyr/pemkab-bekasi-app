'use strict';

const logger = require('../logger/winston');

require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE: {
        mysql: {
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            username: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            logging: msg => logger.info(msg),
            dialect: process.env.DBDIALECT,
        }
    },
    SESSION: {
        key: process.env.SESSIONSECRET,
        store: {
            redis: {
                host: process.env.REDISHOST,
                port: process.env.REDISPORT,
                db: process.env.REDISINDEX,
                password: process.env.REDISPASS,
                user: process.env.REDISUSER
            }
        }
    },
}