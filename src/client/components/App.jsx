import Header from './Header';
import initFirebase from '../utils/auth/initFirebase';

// Init the Firebase app.
initFirebase();

const App = ({ children }) => (
  <main>
    <Header />
    {children}
  </main>
);

export default App;
