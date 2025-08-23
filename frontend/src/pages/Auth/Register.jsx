import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import "./Auth.css";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      await register(userData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response) {
        if (err.response.data && typeof err.response.data === "object") {
          const errorMessages = [];
          for (const [field, errors] of Object.entries(err.response.data)) {
            errorMessages.push(
              `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`
            );
          }
          setError(errorMessages.join("\n"));
        } else {
          setError(err.response.data.detail || "Registration failed. Please try again.");
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
              <header>Create Account</header>
              {error && <div className="error-message">{error}</div>}
              {success ? (
                <div className="success-message">
                  Registration successful! Redirecting...
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="input-field">
                    <input type="text" name="full_name" className="input" required />
                    <label>Full Name</label>
                  </div>
                  <div className="input-field">
                    <input type="email" name="email" className="input" required />
                    <label>Email</label>
                  </div>
                  <div className="input-field">
                    <input type="text" name="username" className="input" required />
                    <label>Username</label>
                  </div>
                  <div className="input-field">
                    <input type="password" name="password" className="input" required />
                    <label>Password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="submit"
                      className="submit"
                      value={isSubmitting ? "Registering..." : "Sign Up"}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="signin">
                    <span>
                      Already have an account? <a href="/login">Log in here</a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
