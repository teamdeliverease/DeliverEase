const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const constants = require('./constants');
const mondaySDK = require('monday-sdk-js');

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

const monday = mondaySDK();
monday.setToken(functions.config().apikeys.monday);

exports.volunteerPostProcess = functions.database
  .ref('/volunteers/{volunteer}')
  .onCreate((snapshot) => {
    const volunteerMailOptions = getVolunteerConfirmationMailOptions(snapshot);
    sendEmail(volunteerMailOptions);
    // TODO: check if staging before calling
    createVolunteerMondayItem(snapshot);
    return true;
  });

exports.requesterPostProcess = functions.database
  .ref('/requesters/{request}')
  .onCreate((snapshot) => {
    const requesterMailOptions = getRequestConfirmationToRequesterMailOptions(snapshot);
    const deliverEaseMailOptions = getRequestConfirmationToDeliverEaseMailOptions(snapshot);
    sendEmail(requesterMailOptions);
    sendEmail(deliverEaseMailOptions);
    // TODO: check if staging before calling
    createRequesterMondayItem(snapshot);
    return true;
  });

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
        itemName: 'New Request',
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

  console.log(result);
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

  console.log(result);
}

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
