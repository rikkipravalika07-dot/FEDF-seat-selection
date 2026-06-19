import { useNavigate } from "react-router-dom";

function SelectBooking() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Select Booking Type</h1>

      <button onClick={() => navigate("/flight")}>
        ✈ Flight Booking
      </button>

      <button onClick={() => navigate("/bus")}>
        🚌 Bus Booking
      </button>

      <button onClick={() => navigate("/train")}>
        🚆 Train Booking
      </button>
    </div>
  );
}

export default SelectBooking;