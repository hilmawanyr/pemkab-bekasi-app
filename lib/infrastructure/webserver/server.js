'use strict';

const constants = require('../config/constants');
const app = require('./app');
const logger = require('../logger/winston');

module.exports = () => {
    if (constants.ENV === 'development') {
        const http = require('http');
        http.createServer(app).listen(constants.PORT, () => {
            logger.info('Server running on port ' + constants.PORT)
        });

    } else {
        const http = require('https');
    }
}