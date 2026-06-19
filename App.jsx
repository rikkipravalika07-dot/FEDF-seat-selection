import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SelectBooking from "./pages/SelectBooking";
import FlightBooking from "./pages/FlightBooking";
import BusBooking from "./pages/BusBooking";
import TrainBooking from "./pages/TrainBooking";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/select" element={<SelectBooking />} />

        <Route path="/flight" element={<FlightBooking />} />
        <Route path="/bus" element={<BusBooking />} />
        <Route path="/train" element={<TrainBooking />} />

        {/* History Page Route */}
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;