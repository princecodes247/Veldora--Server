const nodemailer = require('nodemailer')

 // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'princecodes247@gmail.com',
        pass: process.env.SMTP_PASSWORD
    },
    secure: true
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.sendinblue.com',
//     port: 587,
//     auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_KEY
//     },
//     secure: false,
// });

module.exports = transporter;