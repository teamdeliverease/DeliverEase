import Map from '../components/Map';

const home = { lat: 37.7545, lng: -122.4425 };

export default () => {
  return <Map defaultCenter={home} />;
};
