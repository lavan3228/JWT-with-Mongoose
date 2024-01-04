import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
        user: "AKIAWV2PPJNDI4A74O6M",
        pass: "BP2sUKDb4SOLxGKjw6aNcMkpqXCrM5jeH+ZAQRviUvrO"
    }
});

const mailOptions = {
    from: 'lavankumar3228@gmail.com',
    to: 'sairam.kotaru@xcubelabs.com',
    subject: "Hi Iam aws",
    html: "r u learning aws"
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error", error);
    } else {
        console.log("Email sent:", info.response);
    }
});
