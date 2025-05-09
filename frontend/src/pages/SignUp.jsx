// src/pages/Signup.jsx
import "./Signup.css";

function Signup() {
  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form className="auth-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
