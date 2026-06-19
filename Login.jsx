import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password) {
      navigate("/home");
    } else {
      alert("Please fill out all credential spaces.");
    }
  };

  return (
    <div className="container">
      <h1>Welcome Back 👋</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '25px', marginTop: '-15px' }}>Sign in to manage your journeys.</p>

      <form onSubmit={handleLogin}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Account Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
        New journey planner? <Link to="/signup" style={{ color: 'var(--primary-brand)', fontWeight: '600', textDecoration: 'none' }}>Create Account</Link>
      </p>
    </div>
  );
}

export default Login;