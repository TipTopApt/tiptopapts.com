import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Apartment.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Slide from "react-reveal/Slide";
import airconditioner from "../assets/airconditioner.svg";
import bathtub from "../assets/bathtub.svg";
import fridge from "../assets/fridge.svg";
import wifi from "../assets/wifi.svg";
import { Slides } from "../config/data";

const Apartment = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const pricePerNight = 50; // Replace with your actual price per night

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkOutDate, setCheckOutDate] = useState(currentDate);
  const [guests, setGuests] = useState(2);

  const calculateTotalPrice = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const nights = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    return pricePerNight * nights;
  };

  return (
    <div className="apartment-page">
      <Navbar />
      <div className="apartment-page-container">
        <div className="apartment-title">
          <h1>Apartment</h1>
        </div>
        <div className="apartment-gallery">
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
        <div className="apartment-information">
          <Slide left>
            <div className="apartment-details">
              <div className="apartment-details-stats">
                <p>Capacity: 2-5 persons</p>
                <p>Size: 50m²</p>
                <p>Bedrooms: 2</p>
                <p>Bathrooms: 1</p>
                <p>Living room: 1</p>
                <p>Kitchen: 1</p>
                <p>Price: ₦ 50 /night</p>
              </div>
              <div className="apartment-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatum, doloribus, quidem, quod voluptate dolorum
                  consequuntur voluptas quibusdam quia quae fugit. Quisquam
                  voluptatum, doloribus, quidem, quod voluptate dolorum
                  consequuntur voluptas quibusdam quia quae fugit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatum, doloribus, quidem, quod voluptate dolorum
                  consequuntur voluptas quibusdam quia quae fugit. Quisquam
                  voluptatum, doloribus, quidem, quod voluptate dolorum
                  consequuntur voluptas quibusdam quia quae fugit.
                </p>
              </div>
              <div className="apartment-amenities">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  <div className="amenity">
                    <img src={wifi} alt="" />
                    <p>Free Wifi</p>
                  </div>
                  <div className="amenity">
                    <img src={fridge} alt="" />
                    <p>Fridge</p>
                  </div>
                  <div className="amenity">
                    <img src={airconditioner} alt="" />
                    <p>Air Conditioner</p>
                  </div>
                  <div className="amenity">
                    <img src={bathtub} alt="" />
                    <p>Bathtub</p>
                  </div>
                </div>
              </div>
              <div className="apartment-rules">
                <h3>House Rules</h3>
                <ul>
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>No parties or events</li>
                  <li>Check-in is anytime after 3PM</li>
                  <li>Check out by 12PM (noon)</li>
                </ul>
              </div>
              <div className="apartment-cancellation">
                <h3>Cancellation</h3>
                <p>
                  Cancel up to 5 days before check-in and get a full refund,
                  including service fees.
                </p>
              </div>
            </div>
          </Slide>
          <Slide right>
            <div className="apartment-booking">
              <div className="apartment-booking-title">
                <h3>Book Apartment</h3>
              </div>
              <div className="apartment-booking-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="check-in">
                      Check In <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="check-in"
                      id="check-in"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="check-out">
                      Check Out <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="check-out"
                      id="check-out"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">
                      Guests <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="guests"
                      id="guests"
                      min="2"
                      max="5"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">
                      Name <span className="required">*</span>
                    </label>
                    <input type="text" name="name" id="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input type="email" name="email" id="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone <span className="required">*</span>
                    </label>
                    <input type="tel" name="phone" id="phone" required />
                  </div>

                  <div className="form-group terms">
                    <input type="checkbox" name="terms" id="terms" required />
                    <label htmlFor="terms">
                      I agree to the <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <div className="form-group price">
                    <h3>Total: ₦ {calculateTotalPrice()}</h3>
                  </div>
                  <div className="form-group">
                    <button className="button-primary" type="submit">
                      Book Apartment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
