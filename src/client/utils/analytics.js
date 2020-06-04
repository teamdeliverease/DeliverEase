import firebase from './firebase/client';

const trackClick = (eventType, payload) => {
  firebase.analytics().logEvent(eventType, payload);
};

const trackCTAClick = (eventType) => {
  trackClick('call_to_action', { type: eventType });
};

const trackFlyerClick = () => {
  trackClick('click_flyer', { type: 'promo' });
};

const trackSignUp = (method) => {
  firebase.analytics().logEvent('sign_up', { method });
};

export { trackCTAClick, trackFlyerClick, trackSignUp };
