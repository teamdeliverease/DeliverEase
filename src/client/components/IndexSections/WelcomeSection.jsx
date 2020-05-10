/* eslint-disable jsx-a11y/anchor-is-valid */
import CTAButton from '../CTAButton';
import ThemedLink from '../ThemedLink';
import { trackCTAClick, trackFlyerClick } from '../../utils/analytics';

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="container">
        <div className="row pt-5 pb-7">
          {/* pt-5 mb-5 */}
          <div className="col-12 col-md-7 align-self-center">
            <div className="promo pr-md-3 pr-lg-5">
              <h1 className="headline mb-3">Welcome to DeliverEase!</h1>
              <div className="subheadline mb-4">
                We connect local volunteers with community members who have a hard time getting
                groceries and other essentials.
              </div>
              <div className="cta-holder">
                <CTAButton
                  text="Submit a Request"
                  href="#request-section"
                  type="primary"
                  classes="mr-lg-2 mb-2"
                  onClick={() => trackCTAClick('requester')}
                />
                <CTAButton
                  text="Become a Volunteer"
                  href="#volunteer-section"
                  type="secondary"
                  classes="mb-2 ml-1"
                  onClick={() => trackCTAClick('volunteer')}
                />
              </div>
              <div className="mt-5">
                Can&apos;t volunteer but still want to help? Please spread the word by sharing our{' '}
                <ThemedLink
                  href="assets/flyers/GeneralPromoFlyer_printerFriendly.pdf"
                  onClick={() => trackFlyerClick('promo')}
                >
                  flyer
                </ThemedLink>
                !
              </div>
            </div>
          </div>
          {/* mb-5 mt-4 */}
          <div className="col-12 col-md-5 align-self-center">
            <div className="book-cover-holder">
              <img
                className="img-fluid book-cover"
                src="assets/images/pumpkin.jpg"
                alt="book cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
