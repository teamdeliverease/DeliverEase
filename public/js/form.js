const fulfillment_status = {
  NEW: 'new',
  SOURCING_VOLUNTEER: 'sourcing_volunteer',
  PENDING_FULFILLMENT: 'pending_fullfilment',
  FULFILLING: 'fulfilling',
  COMPLETE: 'complete',
};

var requesterPhoneInput;
var volunteerPhoneInput;

// const config = {
//   apiKey: 'AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c',
//   authDomain: 'deliverease-f9eec.firebaseapp.com',
//   databaseURL: 'https://deliverease-f9eec.firebaseio.com',
//   projectId: 'deliverease-f9eec',
//   storageBucket: 'deliverease-f9eec.appspot.com',
//   messagingSenderId: '436542528471',
//   appId: '1:436542528471:web:90e09ee2379187a34c4992',
//   measurementId: 'G-KVEMXD2KHE',
// };

// firebase.initializeApp(config);

function init() {
  initForms();
  initAutocompleteForAddressFields();
  initPhoneValidation();
}

function initForms() {
  document.getElementById('volunteer-form').addEventListener('submit', submitVolunteerForm);
  // document.getElementById('requester-form').addEventListener('submit', submitRequesterForm);
}

function initAutocompleteForAddressFields() {
  fields = document.getElementsByClassName('address-field');
  for (field of fields) {
    var autocomplete = new google.maps.places.Autocomplete(field);
    autocomplete.setFields(['formatted_address']);
    autocomplete.setTypes(['address']);
  }
}

function initPhoneValidation() {
  requesterPhoneInput = window.intlTelInput(document.querySelector('#requester-phone'), {
    utilsScript: 'assets/plugins/intl-tel-input/js/utils.js',
  });
  volunteerPhoneInput = window.intlTelInput(document.querySelector('#volunteer-phone'), {
    utilsScript: 'assets/plugins/intl-tel-input/js/utils.js',
  });
}

function submitVolunteerForm(e) {
  submitForm(
    e,
    'volunteers',
    getVolunteerFormData,
    'volunteer-form-wrapper',
    'volunteer-confirmation',
  );
}

function submitRequesterForm(e) {
  submitForm(e, 'requesters', getRequesterFormData, 'request-form-wrapper', 'request-confirmation');
}

async function submitForm(e, ref, getFormData, formSelector, confirmationSelector) {
  data = getFormData();
  const formData = { ...data };
  try {
    // validatePhoneNumber(data.phone);
    formData.phone = data.phone.getNumber();
  } catch (ex) {
    alert(ex.message);
    return;
  }

  try {
    const response = await fetch(`/${ref}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

function getVolunteerFormData() {
  return {
    name: getInputValue('volunteer-name'),
    phone: volunteerPhoneInput,
    email: getInputValue('volunteer-email'),
    address: getInputValue('volunteer-address'),
  };
}

function getRequesterFormData() {
  return {
    name: getInputValue('requester-name'),
    phone: requesterPhoneInput,
    email: getInputValue('requester-email'),
    address: getInputValue('requester-address'),
    list: getInputValue('requester-shopping-list'),
    fulfillment_status: fulfillment_status.NEW,
    fulfillment_status_timestamp: null,
  };
}

function showSuccessMessage(formSelector, confirmationSelector) {
  var formElement = document.getElementById(formSelector);
  var confElement = document.getElementById(confirmationSelector);
  formElement.classList.add('hidden');
  formElement.style.visibility = 'hidden';
  confElement.style.display = 'block';
}

function validatePhoneNumber(input) {
  var phoneError = input.getValidationError();
  // here, the index maps to the error code returned from getValidationError - see readme
  var errorMap = [
    'Invalid phone number',
    'Invalid country code',
    'Phone number too short',
    'Phone number too long',
    'Invalid phone number',
  ];

  if (phoneError && phoneError >= 0 && phoneError < 5) {
    throw new Error(errorMap[phoneError]);
  }
}

// function addToFirebase(ref, data) {
//   data.timestamp = firebase.database.ServerValue.TIMESTAMP;
//   if ('fulfillment_status_timestamp' in data) {
//     data.fulfillment_status_timestamp = data.timestamp;
//   }
//   var ref = firebase
//     .database()
//     .ref(ref)
//     .push(data, function(err) {
//       if (err) {
//         console.warn(err);
//       }
//     });
// }

function getInputValue(id) {
  return document.getElementById(id).value;
}
