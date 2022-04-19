const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosalinda.cruickshank77@ethereal.email',
        pass: 'MuBwgJNbfbAbK9Bbmk'
    }
});

module.exports = transporter;