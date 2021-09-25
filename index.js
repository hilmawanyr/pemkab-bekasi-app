'use strict';

const { init } = require('./lib/infrastructure/config/bootstrap');
const logger = require('./lib/infrastructure/logger/winston');
const server = require('./lib/infrastructure/webserver/server');

async function start() {
    try {
        await init();
        server();
    } catch (error) {
        logger.error(`Error while runing the server. Message: ${error}`);
    }
}

start();