import { useEffect } from "react";
import "./Hero.scss";
import Slide from "react-reveal/Slide";

const Hero = () => {
  useEffect(() => {
    const initMap = () => {
      let location = { lat: 9.0492778, lng: 7.4517778 };
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 16,
      });
      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    };

    // Check if the Google Maps API is loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // If not loaded, you can handle this case, e.g., show an error message.
      console.error("Google Maps API not loaded");
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div>
      <div className="hero">
        <div className="hero-container">
          <Slide left>
            <div className="hero-text">
              <h1>The Most Affordable Place to Stay in Abuja</h1>
              <p>Plot 1068, R.I. Uzoma Street, Wuye, Abuja.</p>
            </div>
          </Slide>
          <Slide right>
            <div id="map" className="hero-map"></div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Hero;
