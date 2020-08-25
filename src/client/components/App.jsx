import Header from './Header';

const App = ({ children }) => (
  <main>
    <div className="sunsetBanner">
      Thank you for visiting DeliverEase. We are no longer servicing requests. <br />
      Please stay safe and wear a mask!
    </div>
    <Header />
    {children}
  </main>
);

export default App;
