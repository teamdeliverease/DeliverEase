// https://firebase.google.com/docs/database/security/test-rules-emulator
const firebase = require('@firebase/testing');
const fs = require('fs');

const databaseName = 'deliverease-staging';
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;

const rules = fs.readFileSync('database.rules.json', 'utf8');

const volunteerPayload = {
  firstName: 'Force Push Master',
  lastName: 'Felix',
  email: 'forcepushmaster@felix.com',
  address: '1 Force Push Master Way, GitHub, CA 94002',
  phone: '+12345678912',
  termsAgreement: true,
  language: ['English', 'Spanish'],
  hasCar: true,
};

const requesterPayload = {
  firstName: 'Force Push Master',
  lastName: 'Felix',
  email: 'forcepushmaster@felix.com',
  address: '1 Force Push Master Way, GitHub, CA 94002',
  phone: '+12345678912',
  termsAgreement: true,
  language: ['English', 'Spanish'],
  list: 'muffins',
};

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ databaseName, auth }).database();
}

/**
 * Creates a new admin app.
 *
 * @return {object} the app.
 */
function adminApp() {
  return firebase.initializeAdminApp({ databaseName }).database();
}

before(async () => {
  // Set database rules before running these tests
  await firebase.loadDatabaseRules({
    databaseName,
    rules,
  });
});

beforeEach(async () => {
  // Clear the database between tests
  await adminApp().ref().set(null);
});

after(async () => {
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe('profile read rules', () => {
  const forcePushMasterFelix = authedApp({ uid: 'forcePushMasterFelix' });
  const noOne = authedApp(null);
  it('should allow admin to read volunteers', async () => {
    await adminApp().ref('volunteers').set(volunteerPayload);

    await firebase.assertSucceeds(forcePushMasterFelix.ref('volunteers').once('value'));
    await firebase.assertFails(noOne.ref('volunteers').once('value'));
  });

  it('should allow admin to read requesters', async () => {
    await adminApp().ref('requesters').set(requesterPayload);

    await firebase.assertSucceeds(forcePushMasterFelix.ref('requesters').once('value'));
    await firebase.assertFails(noOne.ref('requesters').once('value'));
  });
});
