const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.sendVolunteerConfirmation = functions.database
  .ref('/volunteers/{volunteer}')
  .onCreate(async snapshot => {
    mailOptions = getVolunteerConfirmationMailOptions(snapshot);
    return mailTransport.sendMail(mailOptions);
  });

function getVolunteerConfirmationMailOptions(snapshot) {
  const volunteerData = snapshot.val();
  return {
    from: '"DeliverEase" <TeamDeliverEase@gmail.com>',
    to: volunteerData.email,
    subject: 'Welcome to DeliverEase!',
    text:
      'Thank you for signing up to be a volunteer! We will reach out whenever there is a delivery request in your area.',
    html: `<p>Hello,</p>
          <p>Thank you so much for signing up to be a volunteer in your community, you rock! Just like your neighbors, we at DeliverEase are grateful to have you on the team. We&rsquo;ll reach out whenever there&rsquo;s a delivery request in your area.</p>
          <p>Before going out on any delivery, remember that the people asking for your assistance are most likely immunocompromised or elderly, so please take extra precautions:</p>
          <ol>
          <li>Prior to picking up the products, use hand sanitizer and/or gloves (mask if you want)</li>
          <li>Place the delivery outside the door without ringing a bell or touching a doorknob.</li>
          <li>Take a 6-foot distance from the door,and contact them by phone to say you&rsquo;ve arrived.</li>
          <li>Wait for the recipient to retrieve their delivery before leaving.</li>
          <li>While keeping your 6-foot distance, remember to be kind. Isolation is hard on people. Your face may be the only face your recipient will see today and beyond. Keep your distance but feel free to check in, engage in conversation, and  a bit of comforting normalcy if you&rsquo;re willing. From our experience, the good feelings will go both ways!</li>
          <li>Let DeliverEase know that the delivery is completed by notifying us via text.</li>
          </ol>
          <p>If you ever have any questions or feedback, please do reach out to us at <a href="mailto:teamdeliverease@gmail.com">teamdeliverease@gmail.com</a> or (415) 633-6261. You are the lifeline of your respective neighborhoods. We recognize that and want to make sure we&rsquo;re doing everything we can to make your service to the community go smoothly.</p>
          <p>Also, we encourage you to share with your friends and network that you signed up to volunteer! You can tag us on Instagram <a href="https://www.instagram.com/team.deliverease/">@team.deliverease</a>.</p>
          <p>Stay safe and thank you,</p>
          <p>DeliverEase</p>`,
  };
}

exports.sendRequestConfirmationToDeliverEase = functions.database
  .ref('/requesters/{request}')
  .onCreate(async snapshot => {
    mailOptions = getRequestConfirmationToDeliverEaseMailOptions(snapshot);
    return mailTransport.sendMail(mailOptions);
  });

function getRequestConfirmationToDeliverEaseMailOptions(snapshot) {
  const requestData = snapshot.val();
  return {
    from: '"DeliverEase" <TeamDeliverEase@gmail.com>',
    to: 'TeamDeliverEase@gmail.com',
    subject: 'New Request! ' + snapshot.key,
    text:
      'Name: ' +
      requestData.name +
      '\n' +
      'UUID: ' +
      snapshot.key +
      '\n' +
      'Email: ' +
      requestData.email +
      '\n' +
      'Address: ' +
      requestData.address +
      '\n' +
      'Phone: ' +
      requestData.phone +
      '\n' +
      'List: ' +
      requestData.list,
  };
}

exports.sendRequestConfirmationToRequester = functions.database
  .ref('/requesters/{request}')
  .onCreate(async snapshot => {
    mailOptions = getRequestConfirmationToRequesterMailOptions(snapshot);
    if (mailOptions.to.trim() !== '') {
      return mailTransport.sendMail(mailOptions);
    }
  });

function getRequestConfirmationToRequesterMailOptions(snapshot) {
  const requestData = snapshot.val();
  return {
    from: '"DeliverEase" <deliverEase@gmail.com>',
    to: requestData.email,
    subject: 'Thanks for your request!',
    text: 'Thank you so much for requesting a delivery. We will be in touch shortly.',
    html: `<p>Hello!</p>
          <p>Thank you so much for requesting a delivery. You will receive a text from us shortly to confirm that your request is being processed. We will do our best to connect you with a volunteer and confirm ASAP. We know these times are difficult for everyone, we&rsquo;re here to make them a little bit easier for you.</p>
          <p>It is our highest priority to keep you and the community safe. Upon receiving your delivery, please remember to take extra precautions:</p>
          <ol>
          <li>Wipe down the groceries and non-porous containers with disinfectants, such as alcohol wipes or soap and water.</li>
          <li>Discard or set aside the bags they came in for at least 24 hours.</li>
          <li>Wash your hands immediately after unpacking groceries.</li>
          </ol>
          <p>Please reach out to us at <a href="mailto:teamdeliverease@gmail.com">teamdeliverease@gmail.com</a> or (415) 633-6261 if you have any questions or feedback.</p>
          <p>Stay safe and thank you,</p>
          <p>DeliverEase</p>`,
  };
}
