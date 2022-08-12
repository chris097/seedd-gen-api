const nodemailer = require('nodemailer');

const { USER_MAIL, USER_PASS } = process.env;

const sendMail = ({email, subject, html}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_MAIL,
            pass: USER_PASS
        }
    })

     let mailTransporter = {
            from: USER_MAIL,
            to: email,
            subject: subject,
            html: html
        }
        transporter.sendMail(mailTransporter, (err) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log('Message sent.')
            }
        })
}

module.exports = sendMail;