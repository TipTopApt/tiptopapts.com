import "./Apartments.scss";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Slide from "react-reveal/Slide";
import { Slides } from "../config/data";

const Apartments = () => {
  return (
    <section className="apartments">
      <div className="apartments-container">
        <Slide left>
          <div className="apartments-details">
            <div className="apartments-heading">
              <h2>Our Apartments</h2>
            </div>
            <div className="apartment-info">
              {/* <h4>This is TipTop</h4> */}
              <h2>Premium Apartments</h2>
              <p>
                Where comfort and luxury meet. Our meticulously designed
                apartments offer a perfect blend of modern amenities and
                elegance.
                <br />
                Whether you are traveling for business or leisure, our premium
                accommodations provide a home away from home.
              </p>
              <Link to="/apartment">
                <button className="button-primary">Book An Apartment</button>
              </Link>
            </div>
          </div>
        </Slide>
        <Slide right>
          <div className="apartments-gallery">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {Slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img src={slide} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Apartments;
