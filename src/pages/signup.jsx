import { Link } from 'react-router-dom';
import './signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card animate-fade-in">
        <h2>Create Account</h2>
        <p>Join us today! It only takes a minute.</p>
        
        <form className="signup-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="example@mail.com" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Must be Alphanumeric & Symbols" required />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup