import "./Contact.scss";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa6";
import Slide from "react-reveal/Slide";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-banner">
        <Navbar />
        <Slide bottom>
          <div className="contact-banner-overlay">
            <h1 className="get-in-touch">Get in Touch</h1>
          </div>
        </Slide>
      </div>
      <div className="contact-container">
        <div className="contact-content">
          <Slide left>
            <div className="contact-info">
              <div className="contact-info-item address">
                <FaLocationDot />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://maps.app.goo.gl/HkkhFKHwhdbs6XS98"
                >
                  1068 R.I. Uzoma Street, Wuye
                  <br />
                  Abuja, Nigeria.
                </a>
              </div>
              <div className="contact-info-item phone">
                <FaPhone />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="tel:+234 704 366 9396"
                >
                  +234 704 366 9396
                </a>
              </div>
              <div className="contact-info-item email">
                <FaEnvelope />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:info@tiptopapts.com"
                >
                  info@tiptopapts.com
                </a>
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
          </Slide>
          <Slide right>
            <div className="reservation-form">
              <h3>For enquiries, reservations or customer feedback.</h3>
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Type Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="1"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="form-group terms">
                  <input type="checkbox" name="terms" id="terms" required />
                  <label htmlFor="terms">
                    I agree to the <a href="/">Terms and Conditions</a>
                  </label>
                </div>
                <div className="form-group">
                  <button className="button-primary" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Contact;
