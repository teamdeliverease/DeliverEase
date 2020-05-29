// Loads the proper env file based on the environment specified. FIREBASE_ENV is specified in the build and deploy commands

const supportedEnvironments = ['local', 'staging', 'production'];

const { FIREBASE_ENV } = process.env;

if (!FIREBASE_ENV) {
  throw new Error('The FIREBASE_ENV environment variable is required but was not specified.');
}

if (!supportedEnvironments.includes(FIREBASE_ENV)) {
  throw new Error(
    `The FIREBASE_ENV option ${FIREBASE_ENV} is invalid. 
    Options are: ${supportedEnvironments.join(', ')}\n`,
  );
}

require('dotenv').config({
  path: `.env.${FIREBASE_ENV}`,
});
