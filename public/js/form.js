const analytics = firebase.analytics();

var requesterPhoneInput;
var volunteerPhoneInput;

const VOLUNTEER_SECTION_SELECTOR = 'volunteer-section';
const REQUESTER_SECTION_SELECTOR = 'requester-section';

const volunteerShareContent = {
  text: 'Going the social distance for my neighborhood with DeliverEase! You can too!',
  url: `${window.location.href}/assets/flyers/IVolunteered.pdf`,
};

const requesterShareContent = {
  text:
    'One less thing to worry about this week knowing local volunteers will deliver my groceries for free. Thank you DeliverEase!',
  url: `${window.location.href}assets/flyers/IReceivedADelivery.pdf`,
};

function init() {
  initForms();
  initTracking();
  initAutocompleteForAddressFields();
  initPhoneValidation();
  initShareButtons();
}

function initForms() {
  document.getElementById('volunteer-form').addEventListener('submit', submitVolunteerForm);
  document.getElementById('requester-form').addEventListener('submit', submitRequesterForm);
}

function initShareButtons() {
  if (navigator.share !== undefined) {
    initMobileShare(VOLUNTEER_SECTION_SELECTOR, volunteerShareContent);
    initMobileShare(REQUESTER_SECTION_SELECTOR, requesterShareContent);
  } else {
    initDesktopShare(VOLUNTEER_SECTION_SELECTOR, volunteerShareContent);
    initDesktopShare(REQUESTER_SECTION_SELECTOR, requesterShareContent);
  }
}

function initTracking() {
  trackClick('requester-cta', 'call_to_action', { type: 'requester' });
  trackClick('volunteer-cta', 'call_to_action', { type: 'volunteer' });
  trackClick('volunteer-flyer', 'click_flyer', { type: 'promo' });
}

function initMobileShare(sectionSelector, shareContent) {
  document
    .querySelector(`#${sectionSelector} .share-button`)
    .addEventListener('click', async () => {
      try {
        await navigator.share(shareContent);
      } catch (err) {
        successMessage.textContent = 'Error: ' + err;
      }
    });
}

function initDesktopShare(sectionSelector, shareContent) {
  document.querySelector(`#${sectionSelector} .share-button`).addEventListener('click', () => {
    location.href = shareContent.url;
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
  submitForm(e, 'volunteers', getVolunteerFormData, VOLUNTEER_SECTION_SELECTOR);
}

function submitRequesterForm(e) {
  submitForm(e, 'requesters', getRequesterFormData, REQUESTER_SECTION_SELECTOR);
}

async function submitForm(e, ref, getFormData, sectionSelector) {
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

  const submitButton = document.querySelector(`#${sectionSelector} button[type="submit"]`);
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
      showSuccessMessage(sectionSelector);
      trackSignUp({ method: ref.slice(0, -1) });
    } else {
      submitButton.disabled = false;
      const errorMessage = await response.text();
      alert(errorMessage);
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

function showSuccessMessage(sectionSelector) {
  const section = document.getElementById(sectionSelector);
  const form = section.querySelector('.form-wrapper');
  const subtitle = section.querySelector('.form-intro');
  const shareButton = section.querySelector('.share-button');
  const confirmationMessage = section.querySelector('.confirmation-message');

  hideElement(form);
  hideElement(subtitle);
  showElement(confirmationMessage);
  showElement(shareButton);
}

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.add('visible');
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
