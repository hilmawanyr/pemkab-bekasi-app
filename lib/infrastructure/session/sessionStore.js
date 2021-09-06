'use strict';

const redis = require('redis');
const { SESSION } = require('../config/constants');
const logger = require('../logger/winston');

const redisClient = redis.createClient(SESSION.store.redis.common);

if (SESSION.store.redis.auth.password !== '') {
    redisClient.auth(SESSION.store.redis.auth.password);
}

redisClient.on("connect", function () {
    logger.info(`Redis session store connected!`)
});

redisClient.on("error", function (err) {
    logger.error(`Unable to connect to redis session store. Message: ${err}`);
});

exports.redisClient = redisClient