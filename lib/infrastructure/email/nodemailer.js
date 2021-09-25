'use strict';

const nodemailer = require('nodemailer');
const { ENV, EMAIL } = require('../config/constants');

exports.transporter = nodemailer.createTransport({
    host: ENV === 'development' ? "smtp.ethereal.email" : EMAIL.host,
    port: ENV === 'development' ? 587 : EMAIL.port,
    secure: ENV === 'development' ? false : EMAIL.secure,
    auth: {
        user: ENV === 'development' ? 'destin.kshlerin44@ethereal.email' : EMAIL.user,
        pass: ENV === 'development' ? 'jybNkvvj9kP2xxaBME' : EMAIL.pass
    }
});