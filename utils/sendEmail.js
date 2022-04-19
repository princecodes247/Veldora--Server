const transporter = require('../config/nodemailer')

// send email
const sendEmail = async (email, subject, text) => {
    // create mail options
    const mailOptions = {
        from: '"Coding Challenge" < Codes',
        to: email,
        subject: subject,
        text: text
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail