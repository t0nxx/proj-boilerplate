"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secrets_1 = require("../config/Secrets");
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: Secrets_1.MailGunApiKey, domain: Secrets_1.MailGunDomain, host: Secrets_1.MailGunHost });
function sendResetPasswordMail(mail, resetCode) {
    const data = {
        from: `Team mail@${Secrets_1.MailGunDomain}`,
        to: `${mail}`,
        subject: 'Reset Password Code',
        text: ` Hi ,Your code is ${resetCode} .`,
    };
    mg.messages().send(data, (error, body) => {
        console.log(body);
    });
}
exports.sendResetPasswordMail = sendResetPasswordMail;
function sendActivationCodeMail(mail, resetCode) {
    const data = {
        from: `Team mail@${Secrets_1.MailGunDomain}`,
        to: `${mail}`,
        subject: 'Account Activation Code',
        text: ` Hi ,Your code is ${resetCode} .`,
    };
    mg.messages().send(data, (error, body) => {
        console.log(body);
    });
}
exports.sendActivationCodeMail = sendActivationCodeMail;
function sendWelcomeMail(mail, userName) {
    const data = {
        from: `Team mail@${Secrets_1.MailGunDomain}`,
        to: `${mail}`,
        subject: 'Welcome To Casting',
        text: `Welcome ,`,
        html: `
        <body bgcolor="#F5F8FA" style="-webkit-text-size-adjust:none;margin:0;padding:0;">
          <p> Welcome ${userName} </p>
        </body>`,
    };
    mg.messages().send(data, (error, body) => {
        console.log(body);
    });
}
exports.sendWelcomeMail = sendWelcomeMail;
//# sourceMappingURL=sendMail.js.map