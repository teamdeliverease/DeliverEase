import InfoCard from '../InfoCard';

const HowItWorksSection = () => {
  return (
    <section className="howItWorks-section theme-bg-light-gradient py-5">
      <div className="container">
        <h2 className="section-heading text-center">How It Works</h2>
        <div className="section-intro single-col-max mx-auto text-center mb-3">
          Turning the quarantine into a quaranteam
        </div>
        <div className="row text-center">
          <InfoCard
            image="/assets/images/lightbulb.png"
            title=" Volunteers sign up to make deliveries "
            text="Volunteers rock! They’ll fulfill requests whenever they were originally planning on
            going to a store themselves, making it convenient to pick up requested items."
          />
          <InfoCard
            image="/assets/images/notepad.png"
            title=" Anyone who could use help can submit a request below "
            text="Whether you have a particular vulnerability or are a healthcare practitioner
            intentionally staying away from public areas, we’re here to help."
          />
        </div>
        <div className="row text-center">
          <InfoCard
            image="/assets/images/heart.png"
            title=" We’ll pass requests to volunteers in your neighborhood "
            text="They’ll let us know when they can fulfill your request, and we’ll let you know when
            to expect your delivery."
          />
          <InfoCard
            image="/assets/images/piggyBank.png"
            imageWidth="65"
            title=" Zero fees "
            text="No service or delivery fees!
            That means $0. Payments for groceries and purchased goods will be arranged between the
            volunteer and community members."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
