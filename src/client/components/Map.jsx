import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { MAPS_API_KEY } from '../constants';

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
  const router = useRouter();

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

  // const shouldRenderPage = isLoggedIn() && isAdminUser();

  // if (typeof window !== 'undefined' && !shouldRenderPage) {
  //   // router.push('/login');
  // }

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
