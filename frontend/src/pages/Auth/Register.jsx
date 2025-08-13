import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import RegisterForm from '../../components/Auth/RegisterForm';
import './Auth.css';

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await register({
        ...userData,
        role: 'user' // Default role for new registrations
      });
      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Handle different error response formats
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          // Handle field-specific errors
          const fieldErrors = Object.entries(err.response.data)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          setError(fieldErrors);
        } else {
          setError(err.response.data);
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        {success ? (
          <div className="success-message">
            Registration successful! Redirecting to login...
          </div>
        ) : (
          <RegisterForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        )}
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;