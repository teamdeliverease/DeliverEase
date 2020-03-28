var requesterPhoneInput;
var volunteerPhoneInput;

const shareData = {
  title: 'DeliverEase',
  text: 'Sign up to volunteer or request with DeliverEase',
  url: 'https://teamdeliverease.com',
};

function init() {
  initForms();
  initAutocompleteForAddressFields();
  initPhoneValidation();
  if (navigator.share !== undefined) {
    initShareButton('requester-share');
    initShareButton('volunteer-share');
  }
  showSuccessMessage('volunteer-form', 'volunteer-confirmation');
}

function initForms() {
  document.getElementById('volunteer-form').addEventListener('submit', submitVolunteerForm);
  document.getElementById('requester-form').addEventListener('submit', submitRequesterForm);
}

function initShareButton(shareSelector) {
  document.getElementById(shareSelector).addEventListener('click', async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error(err);
    }
  });
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
    showSuccessMessage(formSelector, confirmationSelector);
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
  };
}

function showSuccessMessage(formSelector, confirmationSelector) {
  var formElement = document.getElementById(formSelector);
  var confElement = document.getElementById(confirmationSelector);
  var shareElement = document.querySelector(`#${confirmationSelector} button`);

  formElement.classList.add('hidden');
  formElement.style.visibility = 'hidden';
  confElement.style.display = 'block';
  if (navigator.share !== undefined) {
    shareElement.style.display = 'block';
  }
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
