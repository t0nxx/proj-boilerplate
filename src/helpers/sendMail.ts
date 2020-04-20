import { MailGunApiKey, MailGunDomain, MailGunHost } from '../config/Secrets';

import * as mailgun from 'mailgun-js';

const mg = mailgun({ apiKey: MailGunApiKey, domain: MailGunDomain, host: MailGunHost });

export function sendResetPasswordMail(mail, resetCode) {
  const data = {
    from: `Team mail@${MailGunDomain}`,
    to: `${mail}`,
    subject: 'Reset Password Code',
    text: ` Hi ,Your code is ${resetCode} .`,
  };
  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
}

export function sendActivationCodeMail(mail, resetCode) {
  const data = {
    from: `Team mail@${MailGunDomain}`,
    to: `${mail}`,
    subject: 'Account Activation Code',
    text: ` Hi ,Your code is ${resetCode} .`,
  };
  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
}

export function sendWelcomeMail(mail, userName) {
  const data = {
    from: `Team mail@${MailGunDomain}`,
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
