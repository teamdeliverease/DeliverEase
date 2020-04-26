import App from '../components/App';
import WelcomeSection from '../components/IndexSections/WelcomeSection';
import HowItWorksSection from '../components/IndexSections/HowItWorksSection';
import AboutSection from '../components/IndexSections/AboutSection';
import SubmitRequestSection from '../components/IndexSections/SubmitRequestSection';

export default () => (
  <App>
    <p>Index Page</p>
    <WelcomeSection />
    <HowItWorksSection />
    <SubmitRequestSection />
    <AboutSection />
  </App>
);
