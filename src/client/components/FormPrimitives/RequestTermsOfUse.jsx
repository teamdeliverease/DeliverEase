import ThemedLink from '../ThemedLink';

const RequestTermsOfUse = () => {
  return (
    <>
      This is a volunteer effort. As such, deliveries are completed entirely by volunteers and not
      medical professionals. We’re all community members, working together to help the most
      vulnerable access items that would be too risky for them to get themselves. While we take
      every effort to make these deliveries work, we assume no liability for any mishandling,
      incorrect orders, theft, or resulting injury.
      <br />
      <br />
      We make all volunteers affirmatively guarantee that they:
      <ol>
        <li>Are not exhibiting any symptoms of COVID-19.</li>
        <li>
          Have not, in the past 14 days, participated in gatherings with more than 10 people or
          traveled through heavily populated areas (ie. airports, train stations, public transit
          centers, etc).
        </li>
        <li>Have not, in the past 14 days, come in contact with a sick person.</li>
        <li>Have been social distancing.</li>
        <li>
          Will inform us upon experiencing any symptoms of being sick or coming in contact with a
          sick person.
        </li>
      </ol>
      Nonetheless, the volunteers will be entering grocery, appliance, and public stores of the like
      to fulfill the delivery requests. As a result, you assume any risk associated with their
      delivery.
      <br />
      <br />
      DeliverEase is not an authority on health or medical practices. Before helping your community,
      be sure to familiarize and follow all local government guidelines. Health and safety guidance
      from the CDC can be found{' '}
      <ThemedLink href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/disinfecting-your-home.html">
        here
      </ThemedLink>
      .
      <br />
      <br />
      If you represent a group of people that need help in a certain way beyond the capabilities of
      a volunteer delivery, please reach out and tell us your story at teamdeliverease@gmail.com. We
      will help however we can.
      <br />
      <br />
      If you are submitting this request for another party, you certify that you have obtained
      consent to share their contact information with DeliverEase, and that DeliverEase has
      permission to share it with its volunteers for the purpose of fulfilling a request.
      <br />
      <br />
      <i>Waiver</i>
      <br />I am voluntarily participating in the DeliverEase service and I do so entirely at my own
      risk. I am aware of the risks associated with receiving supplies from someone who has traveled
      to and from public and private areas in order to complete these deliveries which include, but
      are not limited to, contracting COVID-19. I understand that these injuries may arise out of my
      own or someone else’s negligence, conditions related to going into public or private places,
      or interacting with others. Nonetheless, I assume all related risks, known or unknown to me,
      of my participation with DeliverEase. I further waive DeliverEase, individuals within it, and
      all of its affiliates from any claims or causes of action and I agree to voluntarily give up
      or waive any right that I otherwise have to bring legal action against DeliverEase or its
      participating community members.
    </>
  );
};

export default RequestTermsOfUse;
