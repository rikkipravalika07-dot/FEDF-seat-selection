import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrainBooking() {
  const navigate = useNavigate();
  
  // 1. Track passengers and selected seats using React State
  const [passengers, setPassengers] = useState(1);
  const [coachType, setCoachType] = useState("Sleeper");
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock data for already taken seats
  const reservedSeats = ["T2", "T5", "T8", "T12"];

  const seats = [
    "T1","T2","T3","T4","T5",
    "T6","T7","T8","T9","T10",
    "T11","T12","T13","T14","T15",
    "T16","T17","T18","T19","T20"
  ];

  // 2. Pricing Configuration
  const BASE_PRICE = 450;
  const coachMultipliers = {
    "Sleeper": 1.0,
    "AC 3 Tier": 2.2,
    "AC 2 Tier": 3.5
  };

  const perTicketPrice = Math.round(BASE_PRICE * coachMultipliers[coachType]);
  const totalPrice = perTicketPrice * passengers;

  // 3. Updated error-free seat handler using state instead of document.querySelector
  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert(`You can only select up to ${passengers} seat(s). Increase passenger count to choose more.`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length !== passengers) {
      alert(`Please select exactly ${passengers} seat(s) on the seat layout before booking.`);
      return;
    }

    const form = e.target;
    const newTicket = {
      bookingId: "TRN" + Math.floor(100000 + Math.random() * 900000),
      name: form.name.value,
      from: form.from.value,
      to: form.to.value,
      date: form.date.value,
      trainName: form.trainName.value,
      departureTime: form.departureTime.value,
      arrivalTime: form.arrivalTime.value,
      passengers: passengers,
      seats: selectedSeats,
      coachType: coachType,
      perTicketPrice: perTicketPrice,
      price: totalPrice,
      type: "Train",
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, newTicket]));

    // Sends the exact total price to the payment processing gate
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <div className="container">
      <h1>Train Booking 🚆</h1>

      <form onSubmit={handleSubmit}>
        <label>Passenger Name</label>
        <input name="name" placeholder="Enter full name" required />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label>From Station</label>
            <input name="from" placeholder="Source station" required />
          </div>
          <div>
            <label>To Station</label>
            <input name="to" placeholder="Destination station" required />
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
              name="passengers"
              min="1"
              value={passengers}
              onChange={(e) => {
                // Safeguard against negative or empty passenger inputs
                const value = Math.max(1, Number(e.target.value));
                setPassengers(value);
                setSelectedSeats([]); // Clear seat configuration dynamically on change to avoid mismatches
              }}
              required
            />
          </div>
        </div>

        <label>Select Train</label>
        <select name="trainName" required>
          <option value="">Choose your train...</option>
          <option value="Vande Bharat">Vande Bharat Express</option>
          <option value="Rajdhani">Rajdhani Express</option>
          <option value="Shatabdi">Shatabdi Express</option>
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

        <label>Coach Type</label>
        <select value={coachType} onChange={(e) => { setCoachType(e.target.value); setSelectedSeats([]); }} required>
          <option value="Sleeper">Sleeper Class (SL)</option>
          <option value="AC 3 Tier">AC 3 Tier (3A)</option>
          <option value="AC 2 Tier">AC 2 Tier (2A)</option>
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

        {/* Real-Time Price Ticket Generator Box */}
        <div className="price-summary-box">
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Ticket Class Pricing ({coachType})</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{perTicketPrice} <span style={{fontSize: '13px', fontWeight: 'normal'}}>x {passengers}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Payable</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>₹{totalPrice}</div>
          </div>
        </div>

        <button type="submit">Proceed to Payment 🚆</button>
      </form>
    </div>
  );
}

export default TrainBooking;