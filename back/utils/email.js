const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log('start send email function  1 ');
  // 1) Create a transporter
  //GMAIL EXAMPLE
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //ACTIVATE in  GMAIL "less secure app" option
  // OTHER SERVICE
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: 'SendinBlue',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_KEY,
    },
  });
  console.log('start send email function  2 ');

  // 2) Define the email options
  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
    // html:
  };
  console.log('start send email function 3 ');
  // console.log('mailoptions', mailOptions);
  console.log('transporter', transporter);

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
