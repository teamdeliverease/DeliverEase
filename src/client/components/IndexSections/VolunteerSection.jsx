import { useState } from 'react';
import axios from 'axios';
import VolunteerForm from './VolunteerForm';
import ShareCard from '../ShareCard';
import {
  REQUESTER_SHARE_CONTENT as shareContent,
  REQUESTER_SHARE_MESSAGE as shareMessage,
  GENERIC_ERROR_MESSAGE,
} from '../../constants';
import 'firebase/analytics';

const VolunteerSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      // disable submit button while waiting on api call
      setSubmitting(true);
      const response = await axios.post('/api/volunteers', {
        ...formData,
        phone: '+19162061598',
        termsAgreement: true,
      });

      if (response.status === 200) {
        setSubmitted(true);
        // analytics.logEvent('sign_up', { method: 'requester' });
      } else {
        // re-enable submit button if there's an error
        setSubmitting(false);
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (err) {
      setSubmitting(false);
      alert(GENERIC_ERROR_MESSAGE);
    }
  };

  return (
    <section className="volunteer-section py-5">
      <div className="container">
        <div className="single-col-max mx-auto">
          <h2 className="section-heading text-center mb-3">Become a Volunteer</h2>
          <div className="row">
            <section className="form-section theme-bg-light">
              <div className="container py-3">
                <div className="lead-form-wrapper single-col-max mx-auto rounded p-lg-5 p-md-3 p-2">
                  <h2 className="form-heading text-center" id="request-title">
                    Sign up to help your community
                  </h2>
                  {submitted ? (
                    <ShareCard message={shareMessage} content={shareContent} />
                  ) : (
                    <>
                      <div className="form-intro text-center mb-3">
                        Fill in your information and we&apos;ll let you know when a neighbor needs
                        help.
                      </div>
                      <VolunteerForm onSubmit={handleSubmit} submitDisabled={submitting} />
                      <div className="text-left small mt-4">
                        By clicking &quot;Sign up&quot;, you consent to recieving text messages and
                        phone calls from the DeliverEase team. Standard messaging and data rates
                        apply.
                      </div>
                      <br />
                      <div className="text-left ">
                        Reminders to volunteers:
                        <ul>
                          <li>
                            Drop off deliveries at the doorstep to avoid coming in contact with the
                            community member. If there are special delivery instructions (i.e. gate
                            access), you will receive instructions from the DeliverEase team.
                          </li>
                          <li>
                            Maintain at least 6 feet distance between others while you grocery shop.
                          </li>
                          <li>
                            Avoid touching your face and wash your hands frequently for at least 20
                            seconds.
                          </li>
                          <li>Please wear protective gear (masks, gloves, etc.) as needed.</li>
                        </ul>
                        <br />
                        <i>
                          As a volunteer you will be expected to coordinate the payment transaction
                          directly with the community member. Community members may or may not have
                          access to Paypal or Venmo, so be prepared to figure out payment with them.
                        </i>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
