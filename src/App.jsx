import "./App.scss";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Apartment from "./pages/Apartment";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="container">
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
