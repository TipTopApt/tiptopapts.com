import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.scss";
import { FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>TipTop Apartments</h1>
        </div>
        <div className="navbar-links">
          <Link className="navbar-link" to="/home">
            Home
          </Link>
          <ScrollLink
            to="apartments-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="navbar-link"
          >
            Book an Apartment
          </ScrollLink>
          <Link className="navbar-link" to="/contact">
            Contact
          </Link>
          <Link className="navbar-link" to="/about">
            About Us
          </Link>
        </div>
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          {showMenu ? <FaXmark color="white" /> : <FaBars />}
        </div>
        {showMenu && (
          <div className={`navbar-menu ${showMenu ? "active" : ""}`}>
            <Link className="navbar-menu-link" to="/">
              Home
            </Link>
            <ScrollLink
              to="apartments-section"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="navbar-menu-link"
              onClick={closeMenu}
            >
              Book an Apartment
            </ScrollLink>
            <Link className="navbar-menu-link" to="/contact">
              Contact
            </Link>
            <Link className="navbar-menu-link" to="/about">
              About Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
