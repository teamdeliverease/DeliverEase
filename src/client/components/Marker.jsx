import { useState } from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow';

function Marker({ userData, type }) {
  const [isVisible, setVisible] = useState(true);

  return (
    <div>
      <img src="assets/images/felixMarker.webp" alt="Felix" />
      {isVisible && <InfoWindow userData={userData} isRequest={type === 'request'} />}
    </div>
  );
}

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
