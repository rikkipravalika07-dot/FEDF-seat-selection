import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account Created successfully! ✅");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Create Account ✨</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '25px', marginTop: '-15px' }}>Get access to premium travel routes globally.</p>

      <form onSubmit={handleSignup}>
        <label>Full Name</label>
        <input type="text" placeholder="John Doe" required />

        <label>Email Address</label>
        <input type="email" placeholder="john@example.com" required />

        <label>Create Secure Password</label>
        <input type="password" placeholder="Minimum 8 characters" minLength="8" required />

        <button type="submit">Register Account</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
        Already have a profile? <Link to="/" style={{ color: 'var(--primary-brand)', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;