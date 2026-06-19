import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely fallback to a base amount if reached directly without a state transfer
  const totalPrice = location.state?.totalPrice || 0;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert("Please populate all credential parameters.");
      return;
    }

    alert("Payment Authorized Successfully! ✅ Your e-ticket has been added to your Travel Log.");
    navigate("/history");
  };

  return (
    <div className="container">
      <h1>Secure Checkout 💳</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', marginTop: '-15px' }}>
        Encryption verified gateway transaction.
      </p>

      {/* Aggregate Balance Statement Box */}
      <div className="price-summary-box" style={{ marginBottom: '25px' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Transaction Reference</div>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Secure Digital Gate</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Amount Payable</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>
            ₹{totalPrice}
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <label>Credit or Debit Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9101 1121"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          required
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label>Expiration Date</label>
            <input 
              type="month" 
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required 
            />
          </div>
          <div>
            <label>Security Code (CVV)</label>
            <input
              type="password"
              placeholder="•••"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>
          Authorize Payment • ₹{totalPrice} 🔒
        </button>
      </form>

      <button 
        onClick={() => navigate("/select")} 
        style={{ backgroundColor: 'transparent', color: '#64748b', border: '1px solid var(--border-color)', marginTop: '12px' }}
        onMouseOver={(e) => e.target.style.background = 'rgba(0,0,0,0.02)'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Cancel Transaction
      </button>
    </div>
  );
}

export default Payment;