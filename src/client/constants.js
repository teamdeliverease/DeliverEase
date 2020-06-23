export const FULFILLMENT_STATUS = {
  NEW: 'new',
  SOURCING_VOLUNTEER: 'sourcing_volunteer',
  PENDING_FULFILLMENT: 'pending_fulfillment',
  FULFILLING: 'fulfilling',
  RESOLVED: 'resolved',
};

export const CLIENT_FULFILLMENT_STATUSES = [
  { value: FULFILLMENT_STATUS.NEW, label: 'New' },
  { value: FULFILLMENT_STATUS.SOURCING_VOLUNTEER, label: 'Sourcing Volunteer' },
  { value: FULFILLMENT_STATUS.PENDING_FULFILLMENT, label: 'Pending Fulfillment' },
  { value: FULFILLMENT_STATUS.FULFILLING, label: 'Fulfilling' },
  { value: FULFILLMENT_STATUS.RESOLVED, label: 'Resolved' },
];

export const GENERIC_ERROR_MESSAGE =
  'Whoops! Something went wrong, sorry about that. If this problem continues, please call us at (415) 633-6261';

export const VOLUNTEERS_REF = 'volunteers';
export const MAPS_API_KEY = 'AIzaSyBnw4vCWKTZgb-OMJPJ15ptB4dEa5zxQnQ';

export const REQUESTER_SHARE_CONTENT = {
  text:
    'One less thing to worry about this week knowing local volunteers will deliver my groceries for free. Thank you DeliverEase!',
  url: '/assets/flyers/IReceivedADelivery.pdf',
};

export const VOLUNTEER_SHARE_CONTENT = {
  text: 'Going the social distance for my neighborhood with DeliverEase! You can too!',
  url: '/assets/flyers/IVolunteered.pdf',
};

export const REQUESTER_SHARE_MESSAGE =
  'Thanks for submitting your request! Our team will reach out when a volunteer in your neighborhood can deliver your items.';

export const VOLUNTEER_SHARE_MESSAGE =
  'Thanks for signing up to volunteer! We’ll reach out when a neighbor needs help.';
