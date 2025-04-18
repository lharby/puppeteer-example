import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_EMAIL_TO = process.env.CLIENT_EMAIL_TO;
const CLIENT_EMAIL_REPLY = process.env.CLIENT_EMAIL_REPLY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET

const sendMail = () => {
    console.log('Creating Transport')

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET
        },
    });

    transporter.set("oauth2_provision_cb", (user, renew, callback) => {
        let accessToken = userTokens[user];
        if (!accessToken) {
            return callback(new Error("Unknown user"));
        } else {
            return callback(null, accessToken);
        }
      });

    transporter.on('token', (token) => {
        console.log('A new access token was generated');
        console.log('User: %s', token.user);
        console.log('Access Token: %s', token.accessToken);
        console.log('Expires: %s', new Date(token.expires));
    });

    const mailOptions = {
        from: CLIENT_EMAIL_REPLY,
        to: CLIENT_EMAIL_TO,
        subject: 'Test from Puppeteer test',
        text:'Puppeteer test was a sucess'
    }

    console.log('Sending mail')

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    });
}

export {
    sendMail
}