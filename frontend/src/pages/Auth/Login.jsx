import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../api/auth';
import LoginForm from '../../components/Auth/LoginForm';
import './Auth.css';

const Login = () => {
  const [error, setError] = useState('');
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/blog';

  const handleSubmit = async (credentials) => {
    try {
      const { user } = await login(credentials);
      authLogin({ user });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <LoginForm onSubmit={handleSubmit} />
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;