import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Footer.scss";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="main">
          <div className="logo">
            <h1>
              Tiptop
              <br />
              Apartments
            </h1>
          </div>
          <div className="contact">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://maps.app.goo.gl/HkkhFKHwhdbs6XS98"
            >
              1068 R.I. Uzoma Street, Wuye,
              <br />
              Abuja, Nigeria.
            </a>
            <a target="_blank" rel="noreferrer" href="tel:+234 704 366 9396">
              +234 704 366 9396
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:contact@tiptopapts.com"
            >
              contact@tiptopapts.com
            </a>
          </div>
          <div className="links">
            <Link className="link" to="/home">
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
            <Link className="link" to="/contact">
              Contact
            </Link>
            <Link className="link" to="/about">
              About Us
            </Link>
          </div>
          <div className="socials">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.facebook.com/profile.php?id=61552314959917"
            >
              <FaFacebook />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/tiptop_apartments/"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/tiptop_20"
            >
              <FaXTwitter />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@tiptopapt"
            >
              <FaTiktok />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.snapchat.com/explore/Tiptopapt"
            >
              <FaSnapchat />
            </a>
          </div>
        </div>
        <div className="sub">
          <Link>Terms and Conditions</Link>
          <Link>Privacy Policy</Link>
          <Link>© 2023 Tiptop Apartments. All rights reserved.</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
