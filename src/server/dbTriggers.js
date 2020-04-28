const axios = require('axios');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const mondaySDK = require('monday-sdk-js');
const constants = require('./constants');

const FIREBASE_PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG).projectId;

function isStagingEnvironment() {
  return FIREBASE_PROJECT_ID === constants.STAGING_PROJECT_ID;
}

function isProductionEnvironment() {
  return FIREBASE_PROJECT_ID === constants.PROD_PROJECT_ID;
}

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

const monday = mondaySDK();
monday.setToken(functions.config().apikeys.monday);

async function createRequesterMondayItem(snapshot) {
  const {
    name,
    uuid,
    address,
    email,
    phone,
    request,
    status,
    resolution,
  } = constants.REQUESTER_COLUMN_MAPPING;
  const requestData = snapshot.val();

  const result = await monday.api(
    `mutation createItem($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
        id
      } 
    }
  `,
    {
      variables: {
        boardId: constants.REQUESTER_BOARD_ID,
        groupId: constants.REQUESTER_NEW_GROUP_ID,
        itemName: 'Request ',
        columnValues: JSON.stringify({
          [name]: requestData.name,
          [uuid]: snapshot.key,
          [address]: requestData.address,
          [email]: requestData.email || '',
          [phone]: requestData.phone,
          [request]: { text: requestData.list },
          [status]: { label: 'New' },
          [resolution]: { label: 'N/A' },
        }),
      },
    },
  );

  if (result.error_code) {
    console.error(new Error(result));
  }
}

async function createVolunteerMondayItem(snapshot) {
  const { name, uuid, address, email, phone } = constants.VOLUNTEER_COLUMN_MAPPING;
  const requestData = snapshot.val();

  const result = await monday.api(
    `mutation createItem($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
        id
      } 
    }
  `,
    {
      variables: {
        boardId: constants.VOLUNTEER_BOARD_ID,
        groupId: constants.VOLUNTEER_GROUP_ID,
        itemName: requestData.name,
        columnValues: JSON.stringify({
          [name]: requestData.name,
          [uuid]: snapshot.key,
          [address]: requestData.address,
          [email]: requestData.email,
          [phone]: requestData.phone,
        }),
      },
    },
  );

  if (result.error_code) {
    console.error(new Error(result));
  }
}

function sendEmail(mailOptions) {
  if (mailOptions.to.trim() !== '') {
    mailTransport.sendMail(mailOptions);
  }
}

function createAvochatoContact(contactInfo) {
  axios
    .post('https://www.avochato.com/v1/contacts', { contactInfo })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

const stagingSubject = `${isStagingEnvironment() ? '[STAGING] ' : ''}`;

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

function getAvochatoContactInfo(snapshot, tags) {
  const contactData = snapshot.val();
  const uuidTag = tags.toLowerCase();
  const info = {
    auth_id: functions.config().apikeys.avochatoid,
    auth_secret: functions.config().apikeys.avochatosecret,
    contacts: [
      {
        phone: contactData.phone,
        name: contactData.name,
        email: contactData.email || '',
        tags,
        [`${uuidTag}_uuid`]: `${snapshot.key}`,
        language: contactData.language.join(', '),
      },
    ],
  };
  if ('hasCar' in contactData) {
    info.contacts[0].has_car = contactData.hasCar.toString();
  }
  return info;
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

// FIREBASE CLOUD FUNCTIONS

exports.volunteerPostProcess = functions.database
  .ref('/volunteers/{volunteer}')
  .onCreate((snapshot) => {
    const volunteerMailOptions = getVolunteerConfirmationMailOptions(snapshot);
    const volunteerAvochatoContactInfo = getAvochatoContactInfo(snapshot, 'Volunteer');
    if (isProductionEnvironment()) {
      sendEmail(volunteerMailOptions);
      createAvochatoContact(volunteerAvochatoContactInfo);
      createVolunteerMondayItem(snapshot);
    }
    return true;
  });

exports.requesterPostProcess = functions.database
  .ref('/requesters/{request}')
  .onCreate((snapshot) => {
    const requesterMailOptions = getRequestConfirmationToRequesterMailOptions(snapshot);
    const deliverEaseMailOptions = getRequestConfirmationToDeliverEaseMailOptions(snapshot);
    const requestAvochatoContactInfo = getAvochatoContactInfo(snapshot, 'Requester');
    if (isProductionEnvironment()) {
      sendEmail(requesterMailOptions);
      sendEmail(deliverEaseMailOptions);
      createAvochatoContact(requestAvochatoContactInfo);
      createRequesterMondayItem(snapshot);
    }
    return true;
  });
