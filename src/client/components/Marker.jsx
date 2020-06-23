import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import InfoWindow from './InfoWindow';
import { FULFILLMENT_STATUS } from '../constants';

const VOLUNTEER_COLOR = '#E55712';

const FULFILLMENT_STATUS_COLORS = {
  [FULFILLMENT_STATUS.NEW]: '#FF158A',
  [FULFILLMENT_STATUS.SOURCING_VOLUNTEER]: '#FDAB3B',
  [FULFILLMENT_STATUS.PENDING_FULFILLMENT]: '#784BD1',
  [FULFILLMENT_STATUS.FULFILLING]: '#579BFC',
  [FULFILLMENT_STATUS.RESOLVED]: '#00C875',
};

const Marker = ({ userData, type }) => {
  const [isVisible, setVisible] = useState(true);
  const isRequest = type === 'request';
  const icon = isRequest ? faMapMarkerAlt : faShoppingCart;
  const color = isRequest
    ? FULFILLMENT_STATUS_COLORS[userData.fulfillment_status]
    : VOLUNTEER_COLOR;
  return (
    <div>
      <FontAwesomeIcon icon={icon} color={color} size="3x" />
      {isVisible && <InfoWindow userData={userData} isRequest={isRequest} />}
    </div>
  );
};

Marker.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    fulfillment_status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Marker;
