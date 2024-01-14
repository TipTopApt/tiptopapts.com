import { useState, useEffect } from "react";
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
import useApartments from "../hooks/api/useApartments";
import { currencyFormatter } from "../utils";
import useBookings from "../hooks/api/useBooking";

const Apartment = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [bookingRef, setBookingRef] = useState(null);
  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkOutDate, setCheckOutDate] = useState(currentDate);
  const [apartment, setApartment] = useState(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const { apartments, getApartments, isLoading: aptLoading } = useApartments();

  const { book, isLoading, getConfigs, configs } = useBookings();
  const { isLoading: codeLoading, getDiscountInfo, discount } = useBookings();

  const calculateTotalPrice = () => {
    if (!apartment) return 0;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const nights = timeDifference / (1000 * 60 * 60 * 24);

    return apartment.pricePerNight * nights;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await book({
      email,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      apartment: apartment._id,
      numberOfGuest: guests,
      phoneNumber: phone,
      from: checkInDate,
      to: checkOutDate,
      discountCode: code,
    });
    if (response)
      setBookingRef({ ...response.booking, transaction: response.transaction });
  };

  const selectApartment = (e) => {
    setApartment(apartments.find((a) => a._id === e.target.value));
  };

  useEffect(() => {
    getConfigs();
    getApartments();
  }, []);

  useEffect(() => {
    if (code.length === 6) getDiscountInfo(code);
  }, [code]);

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
                <p>Internet: 24/7</p>
              </div>
              <div className="apartment-description"></div>
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
                    <p>Shower</p>
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
                <form action="" onSubmit={handleSubmit}>
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
                      min={currentDate}
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
                      min={checkInDate}
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
                      min="1"
                      max="2"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apartment">
                      Apartment <span className="required">*</span>
                    </label>
                    <select
                      className="apartment-select"
                      onChange={selectApartment}
                      disabled={aptLoading}
                      id="apartment"
                    >
                      <option value="">
                        {aptLoading ? "Loading..." : "Select Apartment"}
                      </option>
                      {apartments.map((a, idx) => (
                        <option disabled={!a.available} value={a._id} key={idx}>
                          {a.name} ({currencyFormatter(a.pricePerNight)}) PER
                          NIGHT
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="code">Discount Code</label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    {codeLoading && (
                      <span className="code-message">Checking code...</span>
                    )}
                    {discount && (
                      <>
                        <br />
                        <span className="code-message">
                          {discount.type === "percentage"
                            ? `${discount.amount}%`
                            : currencyFormatter(discount.amount)}{" "}
                          discount
                        </span>
                      </>
                    )}
                  </div>
                  <div className="form-group terms">
                    <input type="checkbox" name="terms" id="terms" required />
                    <label htmlFor="terms">
                      I agree to the <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <div className="form-group price">
                    <h3>
                      Total:{" "}
                      {apartment
                        ? currencyFormatter(
                            calculateTotalPrice() > 0
                              ? calculateTotalPrice() -
                                  (discount?.amount
                                    ? discount.type === "percentage"
                                      ? calculateTotalPrice() *
                                        (discount.amount / 100)
                                      : discount.amount
                                    : 0)
                              : 0
                          )
                        : 0}{" "}
                      <span style={{ fontSize: 12 }}>
                        +{currencyFormatter(configs.cautionDeposite)} caution
                        deposite
                      </span>
                    </h3>
                  </div>
                  {bookingRef && (
                    <div className="modal-status-message">
                      <p className="success-message">Booking successful!</p>
                      <p className="success-message">
                        Booking Reference:{" "}
                        <span style={{ fontWeight: 900 }}>
                          {bookingRef.code}
                        </span>
                      </p>
                      <p className="success-message">
                        follow or copy the link to make your payment now:
                        <a
                          href={bookingRef.transaction.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {bookingRef.transaction.checkoutUrl}
                        </a>
                      </p>
                    </div>
                  )}

                  <div className="form-group">
                    <button
                      disabled={isLoading}
                      className="button-primary"
                      type="submit"
                    >
                      {isLoading ? "Booking..." : "Book Now"}
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
