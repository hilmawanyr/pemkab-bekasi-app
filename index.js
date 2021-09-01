'use strict';

const server = require('./lib/infrastructure/webserver/server');

try {
    server();
} catch (error) {
    console.log(`Error while runing the server. Message: ${error}`);
}