import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">BlogApp</Link>
        <div className="nav-links">
          {user ? (
            <>
              {user.is_blog_admin && (
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
              )}
              <Link to="/blog" className="nav-link">Dashboard</Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;