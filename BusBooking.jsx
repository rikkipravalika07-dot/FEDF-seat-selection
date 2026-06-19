import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BusBooking() {
  const navigate = useNavigate();
  
  // Track inputs and selection strictly via React state to avoid DOM query errors
  const [passengers, setPassengers] = useState(1);
  const [busType, setBusType] = useState("Non-AC");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const reservedSeats = ["S2", "S6", "S10", "S15"];
  const seats = [
    "S1","S2","S3","S4","S5",
    "S6","S7","S8","S9","S10",
    "S11","S12","S13","S14","S15",
    "S16","S17","S18","S19","S20",
    "S21","S22","S23","S24","S25"
  ];

  // Dynamic pricing multipliers
  const BASE_PRICE = 350;
  const busMultipliers = {
    "Non-AC": 1.0,
    "AC": 1.6,
    "Sleeper": 2.2
  };

  const perTicketPrice = Math.round(BASE_PRICE * busMultipliers[busType]);
  const totalPrice = perTicketPrice * passengers;

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert(`You can only select up to ${passengers} seat(s). Increase passenger count to pick more.`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length !== passengers) {
      alert(`Please select exactly ${passengers} seat(s) on the seat arrangement layout.`);
      return;
    }

    const form = e.target;
    const newTicket = {
      bookingId: "BUS" + Math.floor(100000 + Math.random() * 900000),
      name: form.name.value,
      from: form.from.value,
      to: form.to.value,
      date: form.date.value,
      busName: form.busName.value || "Standard Express",
      departureTime: form.departureTime.value,
      arrivalTime: form.arrivalTime.value,
      passengers: passengers,
      seats: selectedSeats, // Plural matching across app
      busType: busType,
      perTicketPrice: perTicketPrice,
      price: totalPrice,
      type: "Bus",
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, newTicket]));

    // Pass total dynamically to the central checkout screen
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <div className="container">
      <h1>Bus Booking 🚌</h1>

      <form onSubmit={handleSubmit}>
        <label>Passenger Name</label>
        <input name="name" placeholder="Enter passenger name" required />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>From City</label>
            <input name="from" placeholder="Source City" required />
          </div>
          <div>
            <label>To City</label>
            <input name="to" placeholder="Destination City" required />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Travel Date</label>
            <input type="date" name="date" required />
          </div>
          <div>
            <label>Passengers</label>
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => {
                setPassengers(Math.max(1, Number(e.target.value)));
                setSelectedSeats([]); // Wipe selected layout array on changes to maintain sanity bounds
              }}
              required
            />
          </div>
        </div>

        <label>Select Bus Service</label>
        <select name="busName" required>
          <option value="">Select Operator...</option>
          <option value="APSRTC">APSRTC</option>
          <option value="TSRTC">TSRTC</option>
          <option value="Orange Travels">Orange Travels</option>
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>Departure Time</label>
            <input type="time" name="departureTime" required />
          </div>
          <div>
            <label>Arrival Time</label>
            <input type="time" name="arrivalTime" required />
          </div>
        </div>

        <label>Bus Comfort Category</label>
        <select value={busType} onChange={(e) => { setBusType(e.target.value); setSelectedSeats([]); }} required>
          <option value="Non-AC">Non-AC Seater</option>
          <option value="AC">AC Seater</option>
          <option value="Sleeper">Luxury AC Sleeper</option>
        </select>

        <div className="seat-map-container">
          <label>Select Seats ({selectedSeats.length}/{passengers})</label>
          <div className="seat-grid">
            {seats.map((s) => (
              <button
                key={s}
                type="button"
                disabled={reservedSeats.includes(s)}
                onClick={() => handleSeatClick(s)}
                className={
                  reservedSeats.includes(s)
                    ? "reserved"
                    : selectedSeats.includes(s)
                    ? "selected"
                    : "available"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="price-summary-box">
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Ticket Base ({busType})</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{perTicketPrice} <span>x {passengers}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Balance</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>₹{totalPrice}</div>
          </div>
        </div>

        <button type="submit">Proceed to Payment 🚌</button>
      </form>
    </div>
  );
}

export default BusBooking;