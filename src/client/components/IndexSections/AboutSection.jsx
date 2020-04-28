import PrivacyModal from '../PrivacyModal';
const AboutSection = () => {
  return (
    <section className="author-section section theme-bg-primary py-5">
      <div className="container py-3">
        <h2 className="section-heading text-center text-white mb-3">About Us</h2>
        <div className="author-bio single-col-max mx-auto text-center">
          <p>
            We are you. Community members who believe a moment of concern is also an opportunity for
            compassion. Next door neighbors who want to do the most we can to help others impacted
            by COVID-19. Passionate volunteers who thrive on furthering a sense of community and
            connection.
          </p>
          <br />
          <h3 className="text-center text-white">Looking for open grocery stores?</h3>
          <p>
            <a href="https://wosostories.com/" className="text-white" target="_blank">
              Check out our friends at WOSO who are putting together a map of local restaurants and
              stores that are still open during COVID-19.
            </a>
          </p>
          <div className="author-links text-center pt-5">
            <h5 className="text-white mb-4">Follow Us</h5>
            <ul className="social-list list-unstyled">
              <li className="list-inline-item">
                <a href="https://www.instagram.com/team.deliverease/">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/Team.DeliverEase">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
            </ul>
            <p>
              (415) 633-6261&nbsp;&nbsp;|&nbsp;&nbsp;
              <a
                className="text-white"
                href="mailto:teamdeliverease@gmail.com?Subject=Website%20Inquiry"
              >
                teamdeliverease@gmail.com
              </a>
            </p>
          </div>
          <div className="text-center pt-4">
            <PrivacyModal
              button=" Privacy Statement "
              title="Privacy Statement"
              body="Your privacy is incredibly important to us. We store your address and contact
              information only to more accurately match you with a volunteer in your given area. The
              only point at which contact information is shared is upon a volunteer’s agreement to
              fulfill a delivery. At that point, the requester’s name, phone number, and address will
              be shared for the volunteer to better communicate about the request and know where to
              deliver it. You can reach out to us at teamdeliverease@gmail.com if you have any
              questions about how we share your information with volunteers or if you would like your
              information removed from our database."
            />
            {/* <a href className="text-white" data-toggle="modal" data-target="#privacyModal">
              Privacy Statement
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
