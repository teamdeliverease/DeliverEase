import RequestForm from './RequestForm';

const SubmitRequestSection = () => {
  return (
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
                <div className="form-intro text-center mb-3">
                  You&apos;ll get notified once we find a match for your request and a volunteer
                  will drop off your items directly to your front door.
                </div>
                <RequestForm />
                {/* <div className="confirmation-message mt-5">
                  <h4 className="form-heading text-center">
                    Thanks for submitting your request! Our team will reach out when a volunteer in
                    your neighborhood can deliver your items.
                  </h4>
                  <br />
                  <h5 className="text-center">In the meantime, please spread the word!</h5>
                  <button
                    id="requester-share"
                    className="btn btn-success btn-submit mx-auto share-button mt-4 hidden"
                  >
                    Share DeliverEase
                  </button>
                </div> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequestSection;
