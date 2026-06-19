import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '10px' }}>Global Travel Portal 🌎</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '35px' }}>Plan, configure, and secure your tickets instantaneously.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button onClick={() => navigate("/select")} style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
          <span>🚀</span> Book a New Journey
        </button>

        <button onClick={() => navigate("/history")} style={{ background: '#64748b', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
          <span>📋</span> View Past Bookings & E-Tickets
        </button>

        <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '15px 0' }} />

        <button 
          onClick={() => navigate("/")} 
          style={{ backgroundColor: 'transparent', color: 'var(--danger-color)', border: '1px solid var(--danger-color)', padding: '10px' }}
          onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.05)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          Logout Session 🚪
        </button>
      </div>
    </div>
  );
}

export default Home;