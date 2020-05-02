import { useState } from 'react';
import axios from 'axios';
import RequestForm from './RequestForm';
import ShareCard from '../ShareCard';
import {
  REQUESTER_SHARE_CONTENT as shareContent,
  REQUESTER_SHARE_MESSAGE as shareMessage,
  GENERIC_ERROR_MESSAGE,
} from '../../constants';
import 'firebase/analytics';

const SubmitRequestSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      // disable submit button while waiting on api call
      setSubmitting(true);
      const response = await axios.post('/api/requesters', {
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
    <section id="request-section" className="request-section">
      <div className="container">
        <div className="single-col-max mx-auto">
          <h2 className="section-heading text-center mb-3">Submit a Request</h2>
          <div className="row">
            <section className="form-section theme-bg-light">
              <div className="container py-3">
                <div className="lead-form-wrapper single-col-max mx-auto rounded p-lg-5 p-md-3 p-2">
                  <h2 className="form-heading text-center" id="request-title">
                    DeliverEase will find you a volunteer in your neighborhood
                  </h2>
                  {submitted ? (
                    <ShareCard message={shareMessage} content={shareContent} />
                  ) : (
                    <>
                      <div className="form-intro text-center mb-3">
                        You&apos;ll get notified once we find a match for your request and a
                        volunteer will drop off your items directly to your front door.
                      </div>
                      <RequestForm onSubmit={handleSubmit} submitDisabled={submitting} />
                      <div className="text-left small mt-4">
                        By clicking &quot;Submit Request&quot;, you consent to recieving text
                        messages and phone calls from the DeliverEase team and its volunteers.
                        Standard messaging and data rates apply.
                      </div>
                      <br />
                      <div className="text-left">
                        <i>
                          You will be expected to pay for the items you ordered upon receipt of the
                          delivery and coordinate with your volunteer on the methods of payment. If
                          you have an online money transfer account (Paypal, Venmo, etc) please be
                          prepared to share this information with your volunteer. If you can, try
                          calling the store ahead and paying for your groceries over the phone. If
                          you only have cash to pay for your groceries, please be prepared with
                          exact change and put your cash in an envelope for your volunteer.
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

export default SubmitRequestSection;
