import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { MAPS_API_KEY, FULFILLMENT_STATUS } from '../constants';
import { listenForVolunteers } from '../api/volunteers';
import { listenForRequests } from '../api/requesters';
import { Marker } from '../utils/markerUtils';

const options = {
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }], // Turn off points of interest.
    },
    {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }], // Turn off bus stations, train stations, etc.
    },
  ],
};

const GoogleMap = ({ zoom, defaultCenter }) => {
  const [center, setCenter] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(pos);
      });
    }
  }, []);

  useEffect(() => {
    async function loadVolunteers() {
      try {
        // disable submit button while waiting on api call
        await listenForVolunteers((snapshot) => {
          const volunteerArray = Object.entries(snapshot).map(([id, volunteer]) => ({
            ...volunteer,
            id,
          }));
          setVolunteers(volunteerArray);
        });
      } catch (err) {
        console.error(err);
      }
    }
    async function loadRequests() {
      try {
        // disable submit button while waiting on api call
        await listenForRequests((snapshot) => {
          const requestArray = Object.entries(snapshot).map(([id, request]) => ({
            ...request,
            id,
          }));
          setRequests(requestArray);
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadVolunteers();
    loadRequests();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {(!isEmpty(volunteers) || !isEmpty(requests)) && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAPS_API_KEY }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={zoom}
          options={options}
        >
          {volunteers.map((volunteer) => (
            <Marker
              type="volunteer"
              userData={volunteer}
              lat={volunteer.lat}
              lng={volunteer.lng}
              key={volunteer.id}
            />
          ))}
          {requests
            .filter(({ fulfillment_status }) => fulfillment_status !== FULFILLMENT_STATUS.RESOLVED)
            .map((request) => (
              <Marker
                type="request"
                userData={request}
                lat={request.lat}
                lng={request.lng}
                key={request.id}
              />
            ))}
        </GoogleMapReact>
      )}
    </div>
  );
};

GoogleMap.propTypes = {
  zoom: PropTypes.number,
  defaultCenter: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }).isRequired,
};
GoogleMap.defaultProps = { zoom: 13 };
export default GoogleMap;
