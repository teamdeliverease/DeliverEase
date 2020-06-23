import { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FULFILLMENT_STATUS, CLIENT_FULFILLMENT_STATUSES } from '../constants';
import { updateRequestStatus } from '../api/requesters';

const FULFILLMENT_STATUS_COLORS = {
  [FULFILLMENT_STATUS.NEW]: '#FF158A',
  [FULFILLMENT_STATUS.SOURCING_VOLUNTEER]: '#FDAB3B',
  [FULFILLMENT_STATUS.PENDING_FULFILLMENT]: '#784BD1',
  [FULFILLMENT_STATUS.FULFILLING]: '#579BFC',
  [FULFILLMENT_STATUS.RESOLVED]: '#00C875',
};

const addInfoWindow = (map, maps, userData, marker) => {
  const infoWindow = new maps.InfoWindow({
    content: `<p>Name: ${userData.name}<br />Phone: ${userData.phone}<br />Address: ${userData.address}`,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  return infoWindow;
};

const InfoWindow = ({ userData, isRequest }) => {
  return (
    <div className="infoWindow">
      Name: {userData.name}
      <br />
      Phone: {userData.phone}
      <br />
      Address: {userData.address}
      {isRequest && (
        <Select
          defaultValue={CLIENT_FULFILLMENT_STATUSES.find(
            ({ value }) => value === userData.fulfillment_status,
          )}
          options={CLIENT_FULFILLMENT_STATUSES}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={({ value }) => updateRequestStatus(userData.id, value)}
        />
      )}
    </div>
  );
};

const Marker = ({ userData, type }) => {
  const [isVisible, setVisible] = useState(true);
  const isRequest = type === 'request';
  const icon = isRequest ? faMapMarkerAlt : faShoppingCart;
  const color = isRequest ? FULFILLMENT_STATUS_COLORS[userData.fulfillment_status] : '#E55712';
  return (
    <div>
      <FontAwesomeIcon icon={icon} color={color} size="3x" />
      {isVisible && <InfoWindow userData={userData} isRequest={isRequest} />}
    </div>
  );
};

const createMarker = (map, maps, userData, icon = null) => {
  const marker = new maps.Marker({
    position: { lat: userData.lat, lng: userData.lng },
    map,
    icon,
  });
  const infoWindow = addInfoWindow(map, maps, userData, marker);

  return { marker, infoWindow };
};

export { createMarker, Marker };
