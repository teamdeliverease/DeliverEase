import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import { MAPS_API_KEY } from '../constants';
import 'firebase/database';
import 'firebase/auth';
import initFirebase from '../utils/auth/initFirebase';

// Init the Firebase app.
initFirebase();

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
    firebase
      .database()
      .ref('volunteers')
      .once(
        'value',
        (snapshot) => {
          console.log(snapshot.val());
          // res.status(200).json(snapshot.val());
        },
        (err) => {
          console.error(err);
          // res.status(500).send(err.message);
        },
      );
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={zoom}
        options={options}
      />
    </div>
  );
};

GoogleMap.propTypes = {
  zoom: PropTypes.number,
  defaultCenter: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }).isRequired,
};
GoogleMap.defaultProps = { zoom: 13 };
export default GoogleMap;
