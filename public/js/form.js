var requesterPhoneInput;
var volunteerPhoneInput;

const analytics = firebase.analytics();

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
  e.preventDefault();

  data = getFormData();
  const formData = { ...data };
  try {
    validatePhoneNumber(data.phone);
    formData.phone = data.phone.getNumber();
  } catch (err) {
    alert(err.message);
    return;
  }

  try {
    const response = await fetch(`/${ref}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      showSuccessMessage(formSelector, confirmationSelector);
    } else {
      alert(response.status)
    }
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
    termsAgreement: document.getElementById('volunteer-terms').checked,
  };
}

function getRequesterFormData() {
  return {
    name: getInputValue('requester-name'),
    phone: requesterPhoneInput,
    email: getInputValue('requester-email'),
    address: getInputValue('requester-address'),
    list: getInputValue('requester-shopping-list'),
    termsAgreement: document.getElementById('requester-terms').checked,
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

function getInputValue(id) {
  return document.getElementById(id).value;
}
