const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const constants = require('./constants');
const mondaySdk = require('monday-sdk-js');

const FIREBASE_PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG).projectId;

function isEnvironmentStaging() {
  return FIREBASE_PROJECT_ID === constants.STAGING_PROJECT_ID;
}

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.volunteerPostProcess = functions.database
  .ref('/volunteers/{volunteer}')
  .onCreate((snapshot) => {
    const volunteerMailOptions = getVolunteerConfirmationMailOptions(snapshot);
    sendEmail(volunteerMailOptions);
    return 0;
  });

exports.requesterPostProcess = functions.database
  .ref('/requesters/{request}')
  .onCreate((snapshot) => {
    const requesterMailOptions = getRequestConfirmationToRequesterMailOptions(snapshot);
    const deliverEaseMailOptions = getRequestConfirmationToDeliverEaseMailOptions(snapshot);
    sendEmail(requesterMailOptions);
    sendEmail(deliverEaseMailOptions);
    return 0;
  });

function sendEmail(mailOptions) {
  if (mailOptions.to.trim() !== '') {
    mailTransport.sendMail(mailOptions);
  }
}

const stagingSubject = `${isEnvironmentStaging ? '[STAGING] ' : ''}`;

function getVolunteerConfirmationMailOptions(snapshot) {
  const volunteerData = snapshot.val();
  return {
    from: '"DeliverEase" <TeamDeliverEase@gmail.com>',
    to: volunteerData.email,
    subject: `${stagingSubject}Welcome to DeliverEase!`,
    text:
      'Thank you for signing up to be a volunteer! We will reach out whenever there is a delivery request in your area.',
    html: constants.VOLUNTEER_EMAIL_CONTENT,
  };
}

function getRequestConfirmationToDeliverEaseMailOptions(snapshot) {
  const requestData = snapshot.val();
  return {
    from: '"DeliverEase" <TeamDeliverEase@gmail.com>',
    to: 'TeamDeliverEase@gmail.com',
    subject: `${stagingSubject}New Request! ${snapshot.key}`,
    text: `Name: ${requestData.name} 
      UUID: ${snapshot.key}
      Email: ${requestData.email}
      Address: ${requestData.address}
      Phone: ${requestData.phone}
      List:  ${requestData.list}`,
  };
}

function getRequestConfirmationToRequesterMailOptions(snapshot) {
  const requestData = snapshot.val();
  return {
    from: '"DeliverEase" <deliverEase@gmail.com>',
    to: requestData.email,
    subject: `${stagingSubject} Thanks for your request!`,
    text: 'Thank you so much for requesting a delivery. We will be in touch shortly.',
    html: constants.REQUESTER_EMAIL_CONTENT,
  };
}
