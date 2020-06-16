import { useState } from 'react';
import Select from 'react-select';
import { CLIENT_FULFILLMENT_STATUSES } from '../constants';
import { updateRequestStatus } from '../api/requesters';

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

  return (
    <div>
      <img src="assets/images/felixMarker.webp" alt="Felix" />
      {isVisible && <InfoWindow userData={userData} isRequest={type === 'request'} />}
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
