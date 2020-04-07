const fetch = require('node-fetch');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const constants = require('./constants');

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
    const volunteerContactDataAvochado = getAvochatoContactInfo(snapshot, 'Volunteer');
    updateContact(volunteerContactDataAvochado);
    sendEmail(volunteerMailOptions);
  });

exports.requesterPostProcess = functions.database
  .ref('/requesters/{request}')
  .onCreate((snapshot) => {
    const requesterMailOptions = getRequestConfirmationToRequesterMailOptions(snapshot);
    const deliverEaseMailOptions = getRequestConfirmationToDeliverEaseMailOptions(snapshot);
    const requestContactDataAvochado = getAvochatoContactInfo(snapshot, 'Requester');
    updateContact(requestContactDataAvochado);
    sendEmail(requesterMailOptions);
    sendEmail(deliverEaseMailOptions);
  });

function sendEmail(mailOptions) {
  if (mailOptions.to.trim() !== '') {
    mailTransport.sendMail(mailOptions);
  }
}

function updateContact(contactInfo) {
  fetch('https://www.avochato.com/v1/contacts', {
    method: 'post',
    body: JSON.stringify(contactInfo),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

function getVolunteerConfirmationMailOptions(snapshot) {
  const volunteerData = snapshot.val();
  return {
    from: '"DeliverEase" <TeamDeliverEase@gmail.com>',
    to: volunteerData.email,
    subject: 'Welcome to DeliverEase!',
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
    subject: `New Request! ${snapshot.key}`,
    text: `Name: ${requestData.name} 
      UUID: ${snapshot.key}
      Email: ${requestData.email}
      Address: ${requestData.address}
      Phone: ${requestData.phone}
      List:  ${requestData.list}`,
  };
}

function getAvochatoContactInfo(snapshot, tags) {
  const contactData = snapshot.val();
  var uuidTag = tags.toLowerCase();
  return {
    auth_id: functions.config().apikeys.avochatoid,
    auth_secret: functions.config().apikeys.avochatosecret,
    contacts: [
      {
        phone: contactData.phone,
        name: contactData.name,
        email: contactData.email,
        tags: tags,
        [`${uuidTag}_uuid`]: `${snapshot.key}`,
      },
    ],
  };
}

function getRequestConfirmationToRequesterMailOptions(snapshot) {
  const requestData = snapshot.val();
  return {
    from: '"DeliverEase" <deliverEase@gmail.com>',
    to: requestData.email,
    subject: 'Thanks for your request!',
    text: 'Thank you so much for requesting a delivery. We will be in touch shortly.',
    html: constants.REQUESTER_EMAIL_CONTENT,
  };
}
