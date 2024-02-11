const nodemailer = require('nodemailer');

const sendEmailDev = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,

    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
    // html:
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailDev;
