import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import Map from '../components/Map';

const isLoggedIn = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (!firebase.auth().currentUser) {
    return false;
  }
  return true;
};

const isAdminUser = async () => {
  try {
    // if we're on the server
    if (typeof window === 'undefined') {
      return false;
    }
    const result = await firebase.auth().currentUser.getIdTokenResult();
    return result.claims.admin;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const home = { lat: 37.7545, lng: -122.4425 };

const MapPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    async function shouldRenderPage() {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        setShouldRender(false);
        setLoading(false);
        return;
      }
      const isAdmin = await isAdminUser();

      setShouldRender(isAdmin);
      setLoading(false);
    }

    shouldRenderPage();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!shouldRender) {
    console.log('YOU ARE NOT LOGGED IN');
    return;
    // router.push('/login');
  }

  return <Map defaultCenter={home} />;
};

export default MapPage;
