"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailHelper = void 0;
const nodemailer = __importStar(require("nodemailer"));
class MailHelper {
    sendmail(tomail, maiSubject, mailContent) {
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
            transporter.sendMail(mailOptions, (error, info) => {
                if (!error) {
                    return resolve(info);
                }
                else {
                    return reject(error);
                }
            });
        });
    }
}
exports.mailHelper = new MailHelper();
