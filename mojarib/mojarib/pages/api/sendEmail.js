const {createTransport} = require('nodemailer');
import {renderToString} from 'react-dom/server';
import {getTemplate} from '../../templates/email';

const transporter = createTransport(
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: process.env.NEXT_PUBLIC_SMTP_POST,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
            pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
        }
    },
    {
        from: {
            name: 'Mojarib',
            address: 'info@mojarib.com'
        },
    }
);

const SendEmail = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            status: 'error',
            message: `Method ${req.method} is not allowed.`
        });
    }

    const {
        mailTo = '',
        subject = '',
        templateName = '',
        props = {}
    } = req.body;
    const template = getTemplate(templateName, props);

    const mailOption = {
        to: mailTo,
        subject: subject,
        html: renderToString(template),
    };
    try {
        await transporter.sendMail(mailOption);
        res.status(200).json({
            status: 'success',
            message: 'Email is sent.'
        });
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: e.message
        });
    }
};

export default SendEmail;
