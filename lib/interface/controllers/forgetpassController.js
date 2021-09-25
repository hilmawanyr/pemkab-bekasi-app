'use strict';

const { transporter } = require('../../infrastructure/email/nodemailer');
const getUserEmail = require('../../app/use_cases/user/getUserEmail');
const { userEmail } = require('../../infrastructure/repositories/userRepository');
const { randString } = require('../../app/use_cases/project/genRandomString');
const persistRecovery = require('../../app/use_cases/auth/saveRecoveryPass');
const { persist, find, validateKey, updatePassword } = require('../../infrastructure/repositories/forgetPassRepository');
const matchPassKey = require('../../app/use_cases/auth/matchPassKey');
const updatePass = require('../../app/use_cases/auth/updatePassword');
const hashPass = require('../../app/use_cases/auth/hashPassword');
const verifKey = require('../../app/use_cases/auth/validateKey');

module.exports = {

    async sendEmail(req, res) {
        try {
            let { email } = req.body;
            let verifEmail = await getUserEmail(email, userEmail);
            if (verifEmail) {
                let randStr = randString(20);
                // save pass key
                await persistRecovery(email, randStr, persist);
                // send email
                await transporter.sendMail({
                    from: "PemKab LitBang Bekasi",
                    to: email,
                    subject: 'Pemulihan Password',
                    html: `<p>Klik link berikut untuk melanjutkan proses pemulihan password, <a href="http://localhost:8030/auth/change_pass/${randStr}">http://localhost:8030/auth/change_pass/${randStr}</a></p>`
                });
                return res.status(200).json({
                    status: 1,
                    description: 'success',
                    message: 'Kami telah mengirimkan link pembaruan password ke alamat email Anda. Mohon cek inbox/spam pada email Anda untuk melanjutkan proses'
                });
            }
            return res.status(400).json({
                status: 3,
                description: 'data not found',
                message: 'Tidak dapat menemukan pengguna dengan email terkait'
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error process',
                message: `Terjadi masalah dalam proses recovery password. Err: ${err}`
            });
        }
    },

    async changePassword(req, res) {
        try {
            let { key } = req.params;
            let matchKey = await matchPassKey(key, find);
            if (matchKey) {
                let data = {
                    template: {
                        pageTitle: 'Ubah password',
                        pageName: 'Ubah password'
                    },
                    data: {
                        passKey: key
                    }
                }
                return res.render('pages/changePass', data);
            }
            return res.render('pages/err404', { pageTitle: '404 not found' });
        } catch (err) {
            throw err;
        }
    },

    async validateNewPassword(req, res) {
        try {
            let { key, password, confirm } = req.body;
            let matchKey = await matchPassKey(key, find);
            if (!matchKey) {
                return res.status(400).json({
                    status: 8,
                    description: 'invalid key',
                    message: 'Pass key tidak valid'
                });
            }
            if (password !== confirm) {
                return res.status(400).json({
                    status: 10,
                    description: 'invalid input validation',
                    message: 'Password and confirm password tidak sama'
                });
            }
            await verifKey(key, validateKey);
            let newPassword = await hashPass(password);
            let update = await updatePass(matchKey.email, newPassword, updatePassword);
            return res.status(200).json({
                status: 1,
                description: 'success',
                message: 'Password berhasil diperbarui'
            });
        } catch (err) {
            return res.status(500).json({
                status: 12,
                description: 'error process',
                message: `Terjadi kendala saat proses pembaruan password. Err: ${err}`
            });
        }
    }

}