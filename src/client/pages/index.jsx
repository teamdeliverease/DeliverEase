import App from '../components/App';
import WelcomeSection from '../components/WelcomeSection';
import InfoCard from '../components/InfoCard';

export default () => (
  <App>
    <p>Index Page</p>
    <WelcomeSection></WelcomeSection>
    <div>
      <InfoCard
        image="/assets/images/piggyBank.png"
        title=" Zero fees "
        text="No service or delivery fees!
        That means $0. Payments for groceries and purchased goods will be arranged between the
        volunteer and community members."
      />
    </div>
  </App>
);
