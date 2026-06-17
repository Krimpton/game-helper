import heroImage from "/images/Hero3.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;