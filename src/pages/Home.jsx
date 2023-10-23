import { Element } from "react-scroll";
import "./Home.scss";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Apartments from "../components/Apartments";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <Navbar />
        <Hero />
      </div>
      <Features />
      <Element name="apartments-section">
        <Apartments />
      </Element>
      <Reviews />
    </div>
  );
};

export default Home;
