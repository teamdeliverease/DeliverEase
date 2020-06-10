import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { MAPS_API_KEY } from '../constants';
import { getVolunteers } from '../api/volunteers';
import { createMarker, Marker } from '../utils/markerUtils';

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

// const handleApiLoaded = (map, maps, volunteers) => {
//   const markers = [];
//   const infoWindows = [];

//   Object.values(volunteers).forEach((volunteer) => {
//     const { marker, infoWindow } = createMarker(map, maps, volunteer);
//     markers.push(marker);
//     infoWindows.push(infoWindow);
//   });
// };

const GoogleMap = ({ zoom, defaultCenter }) => {
  const [center, setCenter] = useState(null);
  const [volunteers, setVolunteers] = useState({});

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

  // We want this to update when volunteers updates but that requires listening to db changes
  useEffect(() => {
    async function loadVolunteers() {
      try {
        // disable submit button while waiting on api call
        const volunteerResult = await getVolunteers();
        setVolunteers(volunteerResult.val());
      } catch (err) {
        console.error(err);
      }
    }
    loadVolunteers();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {!isEmpty(volunteers) && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAPS_API_KEY }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={zoom}
          options={options}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, volunteers)}
        >
          {Object.entries(volunteers).map(([key, volunteer], idx) => (
            <Marker
              userData={volunteer}
              icon=""
              lat={volunteer.lat}
              lng={volunteer.lng}
              key={key}
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
