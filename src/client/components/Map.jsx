import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBnw4vCWKTZgb-OMJPJ15ptB4dEa5zxQnQ' }}
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
