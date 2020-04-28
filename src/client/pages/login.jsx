import React from 'react';
import App from '../components/App';
import FirebaseAuth from '../components/FirebaseAuth';

const authStyle = {
  height: '100vh',
  paddingTop: '4rem',
};

const LoginPage = () => {
  return (
    <App>
      <div style={authStyle}>
        <FirebaseAuth />
      </div>
    </App>
  );
};

export default LoginPage;
