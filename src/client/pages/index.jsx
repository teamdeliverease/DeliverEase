import App from '../components/App';
import WelcomeSection from '../components/IndexSections/WelcomeSection';
import HowItWorksSection from '../components/IndexSections/HowItWorksSection';
import AboutSection from '../components/IndexSections/AboutSection';

export default () => (
  <App>
    <p>Index Page</p>
    <WelcomeSection />
    <HowItWorksSection />
    <AboutSection />
  </App>
);
