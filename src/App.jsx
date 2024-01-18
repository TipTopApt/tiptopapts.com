import "./App.scss";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Apartment from "./pages/Apartment";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success from "./assets/success.svg";

const App = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Check if the 'payment_success' parameter is present
  const paymentSuccess = queryParams.get("payment_success") === "true";

  return (
    <div className="container">
      <ToastContainer />
      {paymentSuccess && (
        <div className="success">
          <div className="cnt-card card">
            <div className="flex">
              <h2>Payment Successful</h2>
              <img src={success} />
            </div>
            <br />
            <p>
              Payment was successful and your booking has been confirmed, please
              check your inbox or spam for a confirmation email
            </p>
            <div className="btns">
              <a href="mailto:">
                <button>Go to mail</button>
              </a>
              <br />
              <a href="/">
                <button>ok</button>
              </a>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apartment" element={<Apartment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
