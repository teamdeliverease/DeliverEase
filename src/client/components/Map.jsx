import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
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

const handleApiLoaded = (map, maps, volunteers) => {
  const markers = [];
  const infoWindows = [];

  volunteers.forEach((volunteer) => {
    const { marker, infoWindow } = createMarker(map, maps, volunteer);
    markers.push(marker);
    infoWindows.push(infoWindow);
  });
};

const GoogleMap = ({ zoom, defaultCenter }) => {
  const [center, setCenter] = useState(null);
  const [volunteers, setVolunteers] = useState(null);

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

  useEffect(
    () => {
      //getVolunteers
      const volunteers = [
        {
          address: '380 Green St, San Francisco, CA 94133, USA',
          email: 'katherinescheer@gmail.com',
          firstName: 'Kate',
          hasCar: true,
          language: ['English'],
          lastName: 'Scheer',
          lat: 37.8000611,
          lng: -122.4055057,
          name: 'Kate Scheer',
          phone: '+14405548355',
          termsAgreement: true,
          timestamp: 1586831905311,
        },
        {
          address: '17 El Camino Moraga, Orinda, CA 94563, USA',
          email: 'tojillian@gmail.com',
          firstName: 'Jillian',
          hasCar: true,
          language: ['English'],
          lastName: 'Kwan-Jacobs',
          lat: 37.8469813,
          lng: -122.1532499,
          name: 'Jillian Kwan-Jacobs',
          phone: '+14158065862',
          termsAgreement: true,
          timestamp: 1586882634816,
        },
        {
          address: '648 Mansell Ave, Austin, TX 78702, USA',
          email: 'stacys23@gmail.com',
          firstName: 'Stacy',
          hasCar: true,
          language: ['English'],
          lastName: 'Schwarz',
          lat: 30.25580679999999,
          lng: -97.699344,
          name: 'Stacy Schwarz',
          phone: '+15126563977',
          termsAgreement: true,
          timestamp: 1587064099793,
        },
        {
          address: '1079 Park Ave, Schenectady, NY 12308, USA',
          email: 'dleiberman@gmail.com',
          firstName: 'David',
          hasCar: true,
          language: ['English', 'Spanish'],
          lastName: 'Leiberman',
          lat: 42.8147064,
          lng: -73.92475329999999,
          name: 'David Leiberman',
          phone: '+15169721964',
          termsAgreement: true,
          timestamp: 1587245175648,
        },
        {
          address: '3734 Falcon Ave, Long Beach, CA 90807, USA',
          email: 'tayezz@gmail.com',
          firstName: 'Justin',
          hasCar: true,
          language: ['English', 'Spanish'],
          lastName: 'Telles',
          lat: 33.8253661,
          lng: -118.1728182,
          name: 'Justin Telles',
          phone: '+17603823463',
          termsAgreement: true,
          timestamp: 1587260850897,
        },
        {
          address: '64 6th Ave, San Francisco, CA 94118, USA',
          email: 'kberven@berkeley.edu',
          firstName: 'Kipper',
          hasCar: true,
          language: ['English'],
          lastName: 'Berven',
          lat: 37.7873893,
          lng: -122.4645331,
          name: 'Kipper Berven',
          phone: '+14155160041',
          termsAgreement: true,
          timestamp: 1587326608898,
        },
        {
          address: '326 Miramar Ave, San Francisco, CA 94112, USA',
          email: 'dydancer2002@gmail.com',
          firstName: 'Dasha',
          hasCar: false,
          language: ['English', 'Other'],
          lastName: 'Yurkevich',
          lat: 37.7247256,
          lng: -122.4578921,
          name: 'Dasha Yurkevich',
          phone: '+14156362488',
          termsAgreement: true,
          timestamp: 1587347841496,
        },
      ];
      setVolunteers(volunteers);
    },
    [
      /*we want this to update when volunteers updates but that requires listening to db changes */
    ],
  );

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={zoom}
        options={options}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, volunteers)}
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
