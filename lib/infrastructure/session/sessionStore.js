'use strict';

const redis = require('redis');
const config = require('../config/constants');

const redisClient = redis.createClient(config.SESSION.store);

exports.redisClient = redisClient