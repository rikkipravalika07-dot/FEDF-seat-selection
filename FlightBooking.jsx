import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightBooking() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const reservedSeats = ["A2", "B3", "C4"]; //[cite: 16]
  const seats = [
    "A1","A2","A3","A4","A5",
    "B1","B2","B3","B4","B5",
    "C1","C2","C3","C4","C5",
    "D1","D2","D3","D4","D5",
    "E1","E2","E3","E4","E5"
  ]; //[cite: 16]

  // Dynamic pricing multipliers based on travel luxury tiers
  const BASE_PRICE = 3500;
  const classMultipliers = {
    "Economy": 1.0,
    "Premium Economy": 1.4,
    "Business": 2.5,
    "First Class": 4.0
  };

  const perTicketPrice = Math.round(BASE_PRICE * classMultipliers[flightClass]);
  const totalPrice = perTicketPrice * passengers;

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return; //[cite: 16]

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat)); //[cite: 16]
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seat]); //[cite: 16]
      } else {
        alert(`Please increase the passenger count to select more seats.`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length !== Number(passengers)) {
      alert(`Please select exactly ${passengers} seat(s) before proceeding.`);
      return;
    }

    const form = e.target;
    const newTicket = {
      bookingId: "PNR" + Math.floor(100000 + Math.random() * 900000), //[cite: 16]
      name: form.name.value, //[cite: 16]
      from: form.from.value, //[cite: 16]
      to: form.to.value, //[cite: 16]
      date: form.date.value, //[cite: 16]
      passengers: passengers,
      seats: selectedSeats, //[cite: 16]
      flightClass: flightClass,
      perTicketPrice: perTicketPrice,
      price: totalPrice, 
      type: "Flight", //[cite: 16]
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || []; //[cite: 16]
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newTicket])); //[cite: 16]
    
    // Pass pricing into context state for the payment checkout view
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <div className="container">
      <h1>Flight Booking ✈️</h1>

      <form onSubmit={handleSubmit}>
        <label>Passenger Name</label>
        <input name="name" placeholder="John Doe" required /> {/*[cite: 16] */}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>From</label>
            <input name="from" placeholder="City or Airport" required /> {/*[cite: 16] */}
          </div>
          <div>
            <label>To</label>
            <input name="to" placeholder="Destination City" required /> {/*[cite: 16] */}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Travel Date</label>
            <input type="date" name="date" required /> {/*[cite: 16] */}
          </div>
          <div>
            <label>Passengers</label>
            <input
              type="number"
              name="passengers"
              min="1"
              value={passengers}
              onChange={(e) => {
                setPassengers(Math.max(1, Number(e.target.value)));
                setSelectedSeats([]); // Reset seats to prevent mismatch errors
              }}
              required
            />
          </div>
        </div>

        <label>Cabin Class</label>
        <select value={flightClass} onChange={(e) => setFlightClass(e.target.value)} required>
          <option value="Economy">Economy</option> {/*[cite: 16] */}
          <option value="Premium Economy">Premium Economy</option> {/*[cite: 16] */}
          <option value="Business">Business</option> {/*[cite: 16] */}
          <option value="First Class">First Class</option> {/*[cite: 16] */}
        </select>

        <div className="seat-map-container">
          <label>Select Your Seats ({selectedSeats.length}/{passengers})</label>
          <div className="seat-grid">
            {seats.map((s) => (
              <button
                key={s}
                type="button"
                disabled={reservedSeats.includes(s)} //[cite: 16]
                onClick={() => handleSeatClick(s)}
                className={
                  reservedSeats.includes(s) //[cite: 16]
                    ? "reserved"
                    : selectedSeats.includes(s) //[cite: 16]
                    ? "selected"
                    : "available"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Dynamic Invoice Window */}
        <div className="price-summary-box">
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Ticket Price ({flightClass})</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{perTicketPrice} <span style={{fontSize: '12px', fontWeight: 'normal'}}>x {passengers}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Amount</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>₹{totalPrice}</div>
          </div>
        </div>

        <button type="submit">Proceed to Payment 💳</button>
      </form>
    </div>
  );
}

export default FlightBooking;