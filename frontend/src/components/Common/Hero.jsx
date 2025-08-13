import './Hero.css';

const Hero = ({ title, subtitle, children }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Hero;