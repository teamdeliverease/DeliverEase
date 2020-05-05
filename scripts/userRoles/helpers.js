/* eslint-disable consistent-return */
/**
 * Grants admin custom claim to email specified
 * @param {object} admin: the initialized firebaseAdmin object
 * @param {string} userEmail: email of user account to make admin
 */
exports.grantAdminRole = async (fbAdmin, userEmail) => {
  const user = await fbAdmin.auth().getUserByEmail(userEmail);
  // if they're already an admin, return
  if (user.customClaims && user.customClaims.admin === true) {
    return;
  }

  return fbAdmin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
};

/**
 * Revokes admin custom claim from the email specified
 * @param {object} admin: the initialized firebaseAdmin object
 * @param {string} userEmail: email of user account to revoke admin privleages from
 */
exports.revokeAdminRole = async (fbAdmin, userEmail) => {
  const user = await fbAdmin.auth().getUserByEmail(userEmail);
  // if they have no custom claims, or they have custom claims but are not admins, return
  if (!user.customClaims || (user.customClaims && user.customClaims.admin === false)) {
    return;
  }

  // setting a claim to null deletes the claim: https://stackoverflow.com/questions/48175477/in-firebase-authentication-is-there-a-way-to-remove-a-custom-claim
  return fbAdmin.auth().setCustomUserClaims(user.uid, {
    admin: null,
  });
};
