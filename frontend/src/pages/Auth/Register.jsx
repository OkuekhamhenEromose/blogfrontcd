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
    await register(userData)
    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000);
  } catch (err) {
    if (err.response) {
      // Handle Django REST framework validation errors
      if (err.response.data && typeof err.response.data === 'object') {
        const errorMessages = [];
        for (const [field, errors] of Object.entries(err.response.data)) {
          errorMessages.push(`${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`);
        }
        setError(errorMessages.join('\n'));
      } else {
        setError(err.response.data.detail || 'Registration failed. Please try again.');
      }
    } else if (err.request) {
      setError('No response from server. Please check your connection.');
    } else {
      setError('An unexpected error occurred. Please try again.');
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