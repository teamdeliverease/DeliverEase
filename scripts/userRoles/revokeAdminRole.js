const firebaseAdmin = require('firebase-admin');
const helpers = require('./helpers');
const serviceAccount = require('../../serviceAccountKey.json');

if (!serviceAccount) {
  throw Error(
    `Unable to find serviceAccountKey.json file. Ensure this is located at the project root`,
  );
}

if (process.argv.length !== 3) {
  throw Error('Invalid use of revokeAdminRole. Usage: node grantAdminRole.js <email>');
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const email = process.argv[2];
helpers
  .revokeAdminRole(firebaseAdmin, email)
  .then(() => {
    console.log(`Admin role has been revoked for ${email}`);
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Failed to revoke admin role for: ${err.message}`);
    process.exit(1);
  });
