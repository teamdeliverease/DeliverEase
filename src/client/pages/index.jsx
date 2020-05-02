import App from '../components/App';
import WelcomeSection from '../components/IndexSections/WelcomeSection';
import HowItWorksSection from '../components/IndexSections/HowItWorksSection';
import AboutSection from '../components/IndexSections/AboutSection';
import SubmitRequestSection from '../components/IndexSections/SubmitRequestSection';
import VolunteerSection from '../components/IndexSections/VolunteerSection';

export default () => (
  <App>
    <WelcomeSection />
    <HowItWorksSection />
    <SubmitRequestSection />
    <VolunteerSection />
    <AboutSection />
  </App>
);
