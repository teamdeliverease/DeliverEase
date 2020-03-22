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
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function validatePhoneNumber(input) {
  var phoneError = input.getValidationError();
  // here, the index maps to the error code returned from getValidationError - see readme
  var errorMap = [
    'Invalid number',
    'Invalid country code',
    'Too short',
    'Too long',
    'Invalid number',
  ];

  if (phoneError && phoneError >= 0 && phoneError < 5) {
    return errorMap[phoneError];
  }

  return '';
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

function addToFirebase(ref, data) {
  var ref = firebase
    .database()
    .ref(ref)
    .push(data, function(err) {
      if (err) {
        console.warn(err);
      }
    });
}
