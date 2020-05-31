import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import { useEffect, useState } from 'react';
// import admin from '../utils/firebase/admin';
import Map from '../components/Map';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';

const home = { lat: 37.7545, lng: -122.4425 };

const isAdminUser = async (user) => {
  if (!user) return null;
  if (typeof user.getIdTokenResult !== 'function') return null;
  try {
    const result = await user.getIdTokenResult();
    return result.claims.admin;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const MapPage = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const { AuthUserInfo } = props;
  const user = get(AuthUserInfo, 'AuthUser.user');

  useEffect(() => {
    async function shouldRenderPage() {
      const isAdmin = await isAdminUser(user);
      setShouldRender(isAdmin);

      if (isAdmin === true || isAdmin === false) {
        setLoading(false);
      }
    }

    shouldRenderPage();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return shouldRender ? <Map defaultCenter={home} /> : <div>Unauthorized</div>;
};

MapPage.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
};

MapPage.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(MapPage));
