import "./Features.scss";
import features from "../assets/features.jpg";
import cost from "../assets/cost.svg";
import comfort from "../assets/comfort.svg";
import restaurant from "../assets/restaurant.svg";
import security from "../assets/security.svg";
import pool from "../assets/pool.svg";
import laundry from "../assets/laundry.svg";
import Slide from "react-reveal/Slide";

const featuresData = [
  {
    icon: cost,
    title: "Affordable world-class living",
  },
  {
    icon: comfort,
    title: "Enjoy premium comfort",
  },
  {
    icon: security,
    title: "24/7 Security",
  },
  {
    icon: restaurant,
    title: "Restaurant & Cafe",
  },
  {
    icon: pool,
    title: "Relaxing pool",
  },
  {
    icon: laundry,
    title: "Laundry services",
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="features-heading">
          <h2>TipTop Takes Care of Everything</h2>
        </div>
        <div className="features-content">
          <Slide left>
            <div className="features-image">
              <img src={features} alt="" />
            </div>
          </Slide>
          <Slide right>
            <div className="features-grid">
              {featuresData.map((feature, index) => (
                <div className="features-grid-item" key={index}>
                  <div className="features-grid-item-icon">
                    <img src={feature.icon} alt="" />
                  </div>
                  <p>{feature.title}</p>
                </div>
              ))}
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default Features;
