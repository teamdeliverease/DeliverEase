var requesterPhoneInput;
var volunteerPhoneInput;

const analytics = firebase.analytics();

function init() {
  initForms();
  initTracking();
  initAutocompleteForAddressFields();
  initPhoneValidation();
}

function initForms() {
  document.getElementById('volunteer-form').addEventListener('submit', submitVolunteerForm);
  document.getElementById('requester-form').addEventListener('submit', submitRequesterForm);
}

function initTracking() {
  trackClick('requester-cta', 'call_to_action', { type: 'requester' });
  trackClick('volunteer-cta', 'call_to_action', { type: 'volunteer' });
  trackClick('volunteer-flyer', 'click_flyer', { type: 'promo' });
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

  const submitButton = document.querySelector(`#${formSelector} button`);
  submitButton.disabled = true;
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
      trackSignUp({ method: ref.slice(0, -1) });
    } else {
      submitButton.disabled = false;
      alert(response.status);
      trackException({ description: response.message, fatal: true });
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

function trackClick(elementId, event, payload) {
  document.getElementById(elementId).addEventListener('click', function() {
    analytics.logEvent(event, payload);
  });
}
function trackSignUp(payload) {
  analytics.logEvent('sign_up', payload);
}
function trackException(payload) {
  analytics.logEvent('exception', payload);
}
