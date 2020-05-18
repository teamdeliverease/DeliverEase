import TestimonialsCarousel from '../TestimonialsCarousel';

const TestimonialsSection = () => {
  return (
    <section id="testimonials-section" className="py-5">
      <div className="container">
        <div className="single-col-max mx-auto">
          <h2 className="section-heading text-center mb-3">Testimonials</h2>
          <div className="row">
            <div className="hero-quotes mt-2 mb-4">
              <TestimonialsCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
