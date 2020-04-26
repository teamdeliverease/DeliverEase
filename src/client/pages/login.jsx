import React from 'react';
import FirebaseAuth from '../components/FirebaseAuth';

const authStyle = {
  height: '100vh',
  paddingTop: '4rem',
};

const Auth = () => {
  return (
    <div style={authStyle}>
      <FirebaseAuth />
    </div>
  );
};

export default Auth;
