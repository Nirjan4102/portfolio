const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  process.env.SMTP_HOST && process.env.SMTP_HOST.includes('gmail')
    ? {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
);

// Verify connection on startup
transporter.verify()
  .then(() => console.log('✅ SMTP transporter ready'))
  .catch((err) => console.warn('⚠️  SMTP verification failed:', err.message));

module.exports = transporter;
