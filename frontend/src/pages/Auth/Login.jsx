import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/auth";
import "./Auth.css";

const Login = () => {
  const [error, setError] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/blog";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    try {
      const userData = await login(credentials);
      authLogin(userData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          {/* Left Image Section */}
          <div className="col side-image">
          </div>

          {/* Right Form Section */}
          <div className="col right">
            <div className="input-box">
              <header>Login</header>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input type="text" name="username" className="input" required />
                  <label>Username</label>
                </div>
                <div className="input-field">
                  <input type="password" name="password" className="input" required />
                  <label>Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Login" />
                </div>
                <div className="signin">
                  <span>
                    Don&apos;t have an account? <a href="/register">Register</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
