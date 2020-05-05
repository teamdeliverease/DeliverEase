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
  // eslint-disable-next-line consistent-return
  return fbAdmin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
};
