import * as nodemailer from 'nodemailer';
class MailHelper {

    sendmail(tomail: any, maiSubject: any, mailContent: any) {
        return new Promise((resolve, reject) => {

            const transporter = nodemailer.createTransport({
                service: process.env.MAILSERVICE,
                auth: {
                    user: process.env.MAILAUTHUSER,
                    pass: process.env.MAILAUTHPASSWORD
                }
            });

            const mailOptions = {
                from: process.env.MAILAUTHUSER,
                to: process.env.TOMAILS,
                subject: maiSubject,
                html: mailContent
            };

            transporter.sendMail(mailOptions, (error: any, info) => {
                if (!error) {
                    return resolve(info);
                } else {
                    return reject(error);
                }
            });
        });
    }
}

export const mailHelper = new MailHelper();
