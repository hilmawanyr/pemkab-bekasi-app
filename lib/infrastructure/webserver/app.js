'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('../../interface/routes/index');

app.use('/bootstrap', express.static( path.join(__dirname, '../../../assets/bootstrap') ));
app.use(routes);
app.set('view engine', 'ejs');

module.exports = app;