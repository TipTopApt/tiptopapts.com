import Navbar from "../components/Navbar";
import "./About.scss";
import Slide from "react-reveal/Slide";
import mission from "../assets/mission.jpg";
import vision from "../assets/vision.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about-banner">
        <Navbar />
        <Slide bottom>
          <div className="about-banner-overlay">
            <h1 className="about-banner-title">About Us</h1>
          </div>
        </Slide>
      </div>
      <div className="about-container">
        <div className="about-content">
          <Slide left>
            <div className="about-content-item">
              <div className="about-content-text">
                <h3>Our Mission</h3>
                <p>
                  Our mission at TipTop Apartments is to provide a home away
                  from home for our guests. We strive to deliver an exceptional
                  level of service and accommodation that exceeds expectations.
                  With a focus on attention to detail, personalized experiences,
                  and a commitment to the highest standards of quality, we aim
                  to be the preferred choice for both short-term visitors and
                  long-term residents in Abuja. We are dedicated to making every
                  stay a delightful and memorable experience, ensuring that 'Tip
                  Top' represents not just our name but our promise.
                </p>
              </div>
              <div className="about-content-image">
                <img src={mission} alt="" />
              </div>
            </div>
          </Slide>
          <Slide right>
            <div className="about-content-item">
              <div className="about-content-image">
                <img src={vision} alt="" />
              </div>
              <div className="about-content-text">
                <h3 className="right">Our Vision</h3>
                <p>
                  At TipTop Apartments, we envision a future where every
                  traveler and resident in Abuja experiences the utmost in
                  comfort, convenience and hospitality. We are committed to
                  redefining modern living by offering luxurious, well-appointed
                  apartments that set the insutry standard crearing memorable
                  stays for our guests and raising the bar in serviced apartment
                  excellence.
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default About;
