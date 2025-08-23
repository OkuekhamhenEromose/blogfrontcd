import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav__bar">
        <div className="nav__logo">
          <Link to="/">CHBlog.</Link>
        </div>
        <ul className="nav__links">
          <li className="link">
            <Link to="/register">Dashboard</Link>
          </li>

          {!isAuthenticated ? (
            <li className="link">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li className="link">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
