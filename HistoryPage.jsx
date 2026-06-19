import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function HistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire booking history?")) {
      localStorage.removeItem("bookings");
      setBookings([]);
    }
  };

  // 📄 Client-side jsPDF E-Ticket Compiler
  const downloadPDFTicket = (booking) => {
    const doc = new jsPDF();

    // Brand Banner Background
    doc.setFillColor(79, 70, 229); // Modern Indigo
    doc.rect(0, 0, 210, 40, "F");

    // Banner Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("BOARDING PASS / E-TICKET", 15, 25);

    // Metadata Right-Aligned
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`REF ID: ${booking.bookingId}`, 150, 25);

    // Main Content Styling
    doc.setTextColor(30, 41, 59); // Dark slate
    doc.setFontSize(12);
    
    doc.setFont("helvetica", "bold");
    doc.text("JOURNEY DETAILS", 15, 55);
    doc.setDrawColor(226, 232, 240);
    doc.line(15, 58, 195, 58); // Horizontal divider

    doc.setFont("helvetica", "normal");
    doc.text(`Passenger Name:  ${booking.name}`, 15, 68);
    doc.text(`Travel Mode:     ${booking.type?.toUpperCase()}`, 15, 76);
    doc.text(`Journey Date:    ${booking.date}`, 15, 84);
    doc.text(`Route Vector:    ${booking.from} to ${booking.to}`, 15, 92);

    // Operator Specific Lines
    let currentY = 100;
    if (booking.trainName || booking.busName) {
      const transportName = booking.trainName || booking.busName;
      doc.text(`Service Line:    ${transportName}`, 15, currentY);
      currentY += 8;
    }

    const classType = booking.flightClass || booking.coachType || booking.busType || "Standard";
    doc.text(`Service Tier:    ${classType}`, 15, currentY);
    
    // Seat Configurations
    const assignedSeats = booking.seats ? booking.seats.join(", ") : "Not Assigned";
    doc.text(`Assigned Seats:  ${assignedSeats}`, 15, currentY + 8);

    // Payment Section Box
    doc.setFillColor(248, 250, 252); // Light grey banner box
    doc.rect(15, currentY + 20, 180, 25, "F");
    
    doc.setFont("helvetica", "bold");
    doc.text(`Total Passengers: ${booking.passengers || 1}`, 20, currentY + 35);
    
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129); // Success Green
    doc.text(`TOTAL PAID: INR ${booking.price}/-`, 120, currentY + 35);

    // Save triggers automatically on the device download pool
    doc.save(`Ticket_${booking.bookingId}.pdf`);
  };

  return (
    <div className="container" style={{ width: '600px' }}>
      <h1>Your Travel Log 📋</h1>

      <input
        type="text"
        placeholder="🔍 Filter by Booking Reference ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginBottom: '25px' }}
      />

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>No active bookings discovered.</p>
          <button onClick={() => navigate("/select")}>Book a New Journey</button>
        </div>
      ) : (
        <>
          {bookings
            .filter((booking) =>
              booking.bookingId?.toLowerCase().includes(searchId.toLowerCase())
            )
            .map((booking, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid var(--border-color)",
                  padding: "22px",
                  margin: "15px 0",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#fff",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-brand)', backgroundColor: 'rgba(79, 70, 229, 0.08)', padding: '6px 12px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                    {booking.type?.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Ref PNR: <b style={{ color: 'var(--text-main)' }}>{booking.bookingId}</b>
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                  <p style={{ margin: 0 }}><strong>Passenger:</strong> {booking.name}</p>
                  <p style={{ margin: 0 }}><strong>Date:</strong> {booking.date}</p>
                  <p style={{ margin: 0 }}><strong>Route:</strong> {booking.from} ➔ {booking.to}</p>
                  <p style={{ margin: 0 }}><strong>Seats:</strong> {booking.seats ? booking.seats.join(", ") : "None"}</p>
                  
                  {booking.flightClass && <p style={{ margin: 0 }}><strong>Class:</strong> {booking.flightClass}</p>}
                  {booking.coachType && <p style={{ margin: 0 }}><strong>Coach:</strong> {booking.coachType}</p>}
                  {booking.busType && <p style={{ margin: 0 }}><strong>Fleet:</strong> {booking.busType}</p>}
                  
                  {booking.trainName && <p style={{ margin: 0 }}><strong>Train:</strong> {booking.trainName}</p>}
                  {booking.busName && <p style={{ margin: 0 }}><strong>Operator:</strong> {booking.busName}</p>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '12px', borderTop: '1px dashed var(--border-color)', marginBottom: '15px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Fare Itemized: ₹{booking.perTicketPrice || Math.round(booking.price / (booking.passengers || 1))} x {booking.passengers || 1}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success-color)' }}>
                    Paid: ₹{booking.price}
                  </span>
                </div>

                {/* 📄 Download Action Trigger Button */}
                <button 
                  onClick={() => downloadPDFTicket(booking)}
                  style={{ background: 'none', color: 'var(--primary-brand)', border: '1px solid var(--primary-brand)', padding: '10px', fontSize: '14px' }}
                  onMouseOver={(e) => { e.target.style.background = 'rgba(79, 70, 229, 0.05)' }}
                  onMouseOut={(e) => { e.target.style.background = 'none' }}
                >
                  Download Official E-Ticket (PDF) 📥
                </button>
              </div>
            ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
            <button onClick={() => navigate("/select")} style={{ background: '#64748b' }}>
              ⬅ Back to Selection
            </button>
            <button onClick={clearHistory} style={{ backgroundColor: 'var(--danger-color)' }}>
              Clear All Logs 🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HistoryPage;