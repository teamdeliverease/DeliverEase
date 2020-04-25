import Button from 'react-bootstrap/Button';
import Header from './Header';

const App = ({ children }) => (
  <main>
    <Header />
    {children}
  </main>
);

export default App;
