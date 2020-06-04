const STAGING_PROJECT_ID = 'deliverease-staging';
const PROD_PROJECT_ID = 'deliverease-f9eec';

const VOLUNTEER_BOARD_ID = 519301527;
const REQUESTER_BOARD_ID = 508460665;
const VOLUNTEER_GROUP_ID = 'topics';
const REQUESTER_NEW_GROUP_ID = 'topics';

const REQUESTER_COLUMN_MAPPING = {
  name: 'text6',
  uuid: 'text',
  address: 'location28',
  email: 'text69',
  phone: 'phone1',
  request: 'request',
  status: 'status2',
  resolution: 'status8',
};

const VOLUNTEER_COLUMN_MAPPING = {
  name: 'name7',
  uuid: 'uuid',
  address: 'address',
  email: 'email',
  phone: 'phone0',
};

module.exports = {
  PROD_PROJECT_ID,
  STAGING_PROJECT_ID,
  VOLUNTEER_BOARD_ID,
  REQUESTER_BOARD_ID,
  REQUESTER_NEW_GROUP_ID,
  VOLUNTEER_GROUP_ID,
  REQUESTER_COLUMN_MAPPING,
  VOLUNTEER_COLUMN_MAPPING,
};
