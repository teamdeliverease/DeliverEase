import Header from './Header';

const App = ({ children }) => (
  <main>
    <div className="sunsetBanner">
      DeliverEase is no longer operating. <br /> Thank you for visiting DeliverEase. We're closed,
      go away.
    </div>
    <Header />
    {children}
  </main>
);

export default App;
