import Carousel from 'react-bootstrap/Carousel';

const TestimonialsCarousel = () => (
  <Carousel
    id="quotes-carousel"
    className="quotes-carousel carousel slide carousel-fade mb-5"
    interval={8000}
    controls={false}
  >
    <Carousel.Item className="carousel-item active">
      <blockquote className="quote p-4 theme-bg-light">
        &quot;I can’t get around because I have no car, I’m stuck watching kids because all child
        care in the city closed down, and if I don’t stay home and get work done I will lose my job.
        Things are looking bleak but then I hear about this and not only does it work, it works
        better than similar services I’ve come across&nbsp;.&nbsp;.&nbsp;.&nbsp;This is definitely a
        lifesaver.&quot;
        <br />
        <br />
        &mdash;&nbsp;Clarissa, Requester
      </blockquote>
    </Carousel.Item>
    <Carousel.Item className="carousel-item">
      <blockquote className="quote p-4 theme-bg-light">
        &quot;I’m a 6 year resident of San Francisco and moved here because of how much I love the
        city, which of course goes hand in hand with volunteering. I want to fight the notion that
        SF is now a city of transplants who don’t care about the community around them, and your
        service provides a direct and impactful way to provide service to my community.&quot;
        <br />
        <br />
        &mdash;&nbsp;Frank, Volunteer
      </blockquote>
    </Carousel.Item>
    <Carousel.Item className="carousel-item">
      <blockquote className="quote p-4 theme-bg-light">
        &quot;Having had spent two weeks in SFGH for two emergency surgeries and recovery I was sent
        home with the strict instructions not to go to any public place — such as a store — given my
        not only being a senior, but also because of my weakened immune system due to the
        hospitalization for at least two to three weeks. I’ve tried Instacart for shopping, but as
        everything available through them is so marked up it’s rather unaffordable, DeliverEase is
        the perfect solution to my current situation and can’t thank you all enough for being
        there!&quot;
        <br />
        <br />
        &mdash;&nbsp;Scott, Requester
      </blockquote>
    </Carousel.Item>
  </Carousel>
);

export default TestimonialsCarousel;
