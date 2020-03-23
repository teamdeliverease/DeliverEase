var requesterPhoneInput;
var volunteerPhoneInput;

const config = {
  apiKey: 'AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c',
  authDomain: 'deliverease-f9eec.firebaseapp.com',
  databaseURL: 'https://deliverease-f9eec.firebaseio.com',
  projectId: 'deliverease-f9eec',
  storageBucket: 'deliverease-f9eec.appspot.com',
  messagingSenderId: '436542528471',
  appId: '1:436542528471:web:90e09ee2379187a34c4992',
  measurementId: 'G-KVEMXD2KHE',
};

firebase.initializeApp(config);

function init() {
  initForms();
  initAutocompleteForAddressFields();
  initPhoneValidation();
}

function initForms() {
  document.getElementById('volunteer-form').addEventListener('submit', submitVolunteerForm);
  document.getElementById('requester-form').addEventListener('submit', submitRequesterForm);
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
  e.preventDefault();

  var name = getInputValue('volunteer-name');
  var phone = volunteerPhoneInput.getNumber();
  var address = getInputValue('volunteer-address');
  var volunteerForm = document.getElementById('volunteer-form-wrapper');
  var volunteerConfirmation = document.getElementById('volunteer-confirmation');

  try {
    validatePhoneNumber(volunteerPhoneInput);
  } catch (ex) {
    alert(ex.message);
    return;
  }
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      var data = {
        name: name,
        phone: phone,
        address: results[0].formatted_address,
        lat: location.lat(),
        lng: location.lng(),
      };
      addToFirebase('volunteers', data);

      volunteerForm.classList.add('hidden');
      volunteerForm.style.visibility = 'hidden';
      volunteerConfirmation.style.display = 'block';
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function submitRequesterForm(e) {
  e.preventDefault();

  var name = getInputValue('requester-name');
  var phone = requesterPhoneInput.getNumber();
  var address = getInputValue('requester-address');
  var list = getInputValue('requester-shopping-list');
  var requestForm = document.getElementById('request-form-wrapper');
  var requestConfirmation = document.getElementById('request-confirmation');

  try {
    validatePhoneNumber(requesterPhoneInput);
  } catch (ex) {
    alert(ex.message);
    return;
  }
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      var data = {
        name: name,
        phone: phone,
        address: results[0].formatted_address,
        list: list,
        lat: location.lat(),
        lng: location.lng(),
      };
      addToFirebase('requesters', data);

      requestForm.classList.add('hidden');
      requestForm.style.visibility = 'hidden';
      requestConfirmation.style.display = 'block';
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
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

function getInputValue(id) {
  return document.getElementById(id).value;
}

function addToFirebase(ref, data) {
  data.timestamp = firebase.database.ServerValue.TIMESTAMP;
  var ref = firebase
    .database()
    .ref(ref)
    .push(data, function(err) {
      if (err) {
        console.warn(err);
      }
    });
}
