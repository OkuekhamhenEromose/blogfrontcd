import { Link } from 'react-router-dom';
import Hero from '../components/Common/Hero';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <div className="container">
        <h2>Welcome to our Blog</h2>
        <p>Discover amazing content and share your thoughts</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/blog" className="btn btn-secondary">Explore Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;