const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
console.log(gmailEmail + gmailPassword)
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a volunteer signs up.
exports.sendVolunteerConfirmation = functions.database.ref('/volunteers/{volunteer}').onCreate(async(snapshot) => {
  const volunteer = snapshot.val();
  console.log("sending to volunteer")

  const mailOptionsVolunteer = {
    from: '"deliverEase" <teamDeliverEase@gmail.com>',
    to: volunteer.email,
  };


  // Building Email message.
  mailOptionsVolunteer.subject = 'Welcome to DeliverEase' ;
  mailOptionsVolunteer.text = 'Thank you for signing up to be a volunteer!' ;
  mailOptionsVolunteer.html = '<p>Hello,</p><p>Thank you so much for signing up to be a volunteer in your community, you rock! &nbsp;Just like your neighbors, we at DeliverEase are grateful to have you on the team. &nbsp;We’ll reach out whenever there’s a delivery request in your area.</p><p>Before going out on any delivery, remember that the people asking for your assistance are most likely immunocompromised or elderly, so please take extra precautions:&nbsp;</p><p>1. Prior to picking up the products, use hand sanitizer and/or gloves (mask if you want)</p><p>2. Place the delivery outside the door without ringing a bell or touching a doorknob.&nbsp;</p><p>3. Take a 6-foot distance from the door,and contact them by phone to say you’ve arrived.&nbsp;</p><p>4. Wait for the recipient to retrieve their delivery before leaving.</p><p>5. While keeping your 6-foot distance, remember to be kind. Isolation is hard on people. Your face may be the only face your recipient will see today and beyond. Keep your distance but feel free to check in, engage in conversation, and create a bit of comforting normalcy if you’re willing. From our experience, the good feelings will go both ways!</p><p>6. Let DeliverEase know that the delivery is completed.</p><p>If you ever have any questions or feedback, please do reach out to us at teamdeliverease@gmail.com or (415) 633-6261. &nbsp;You are the lifeline of your respective neighborhoods. &nbsp;We recognize that and want to make sure we’re doing everything we can to make your service to the community go smoothly.</p><p>Also, there is a downloadable PDF “I Volunteered” flyer on our website, we encourage you to share with your friends and network that you signed up to volunteer! &nbsp;You can tag us on Instagram @team.deliverease. &nbsp;</p><p>Stay safe and thank you,</p><p>Team Deliverease</p>';

return mailTransport.sendMail(mailOptionsVolunteer);

});


// Send an email to deliverEase when request comes in.
exports.sendRequestConfirmation =  functions.database.ref('/requesters/{request}').onCreate(async(snapshot) => {
  console.log("doing something")
  const request = snapshot.val();

  const mailOptionsRequest = {
    from: '"deliverEase" <deliverEase@gmail.com>',
    to: "teamdeliverEase@gmail.com",
  };


  // Building Email message.
  mailOptionsRequest.subject = 'New Request!' ;
  mailOptionsRequest.text = 'Name: ' + request.name + '\n' + 'Address: ' + request.address + '\n' + 'Phone: ' + request.phone + '\n' + 'List: ' + request.list;

return mailTransport.sendMail(mailOptionsRequest);

});