import App from '../components/App';
import WelcomeSection from '../components/IndexSections/WelcomeSection';
import HowItWorksSection from '../components/IndexSections/HowItWorksSection';
import AboutSection from '../components/IndexSections/AboutSection';
import SubmitRequestSection from '../components/IndexSections/SubmitRequestSection';
import VolunteerSection from '../components/IndexSections/VolunteerSection';
import { MAPS_API_KEY } from '../constants';

export default () => (
  <App>
    <script src={`https://maps.google.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`} />
    <WelcomeSection />
    <HowItWorksSection />
    <SubmitRequestSection />
    <VolunteerSection />
    <AboutSection />
  </App>
);
