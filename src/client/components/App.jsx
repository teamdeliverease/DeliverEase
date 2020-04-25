import Button from 'react-bootstrap/Button';
import Header from './Header';

const App = ({ children }) => (
  <main>
    <Header />
    <Button onClick={() => console.log('clicked')}>Click me</Button>
    {children}
  </main>
);

export default App;
