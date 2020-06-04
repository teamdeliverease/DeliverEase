import App from '../components/App';
import WelcomeSection from '../components/IndexSections/WelcomeSection';
import HowItWorksSection from '../components/IndexSections/HowItWorksSection';
import AboutSection from '../components/IndexSections/AboutSection';
import SubmitRequestSection from '../components/IndexSections/SubmitRequestSection';
import VolunteerSection from '../components/IndexSections/VolunteerSection';
import TestimonialsSection from '../components/IndexSections/TestimonialsSection';

export default () => (
  <App>
    <WelcomeSection />
    <HowItWorksSection />
    <SubmitRequestSection />
    <VolunteerSection />
    <TestimonialsSection />
    <AboutSection />
  </App>
);
