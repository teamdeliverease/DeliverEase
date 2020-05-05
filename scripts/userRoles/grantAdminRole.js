const firebaseAdmin = require('firebase-admin');
const helpers = require('./helpers');
const serviceAccount = require('../../serviceAccountKey.json');

if (!serviceAccount) {
  throw Error(
    `Unable to find serviceAccountKey.json file. Ensure this is located at the project root`,
  );
}

if (process.argv.length !== 3) {
  throw Error('Invalid use of grantAdminRole. Usage: node grantAdminRole.js <email>');
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const email = process.argv[2];
helpers
  .grantAdminRole(firebaseAdmin, email)
  .then(() => {
    console.log(`User ${email} has been given admin role`);
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Failed to grant user admin role: ${err.message}`);
    process.exit(1);
  });
