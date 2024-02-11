/* eslint-disable prefer-const */
const SibApiV3Sdk = require('sib-api-v3-sdk');

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY_BREVO;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmailProd(props) {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = props.subject;
  sendSmtpEmail.htmlContent = props.html;
  sendSmtpEmail.sender = {
    name: props.from,
    email: 'noreply@studybuddyhub.com',
  };
  sendSmtpEmail.to = [{ email: props.email }];
  sendSmtpEmail.replyTo = {
    email: 'noreply@studybuddyhub.com',
    name: 'StudyBuddyHub',
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmailProd;
