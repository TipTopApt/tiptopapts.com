import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
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
  const pricePerNight = 100000;
  const calculateTotalPrice = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const nights = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    return pricePerNight * nights;
  };

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkOutDate, setCheckOutDate] = useState(currentDate);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [affiliateCodes, setAffiliateCodes] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState(calculateTotalPrice());
  const [codeValidationMessage, setCodeValidationMessage] = useState("");
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(""); // Add booking status state
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [isApartmentsAvailable, setIsApartmentsAvailable] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  // Function to check if there are available apartments
  const checkApartmentsAvailability = async () => {
    const apartmentsCollection = collection(db, "Apartments");
    const snapshot = await getDocs(apartmentsCollection);

    // Check is all apartments are unavailable
    const allApartmentsUnavailable = snapshot.docs.every(
      (doc) => doc.data().status === "unavailable"
    );

    if (allApartmentsUnavailable) {
      setIsApartmentsAvailable(false);
    } else {
      setIsApartmentsAvailable(true);

      const availableApartments = snapshot.docs.filter(
        (doc) =>
          doc.data().status === "available" || doc.data().status === "booked"
      );

      if (availableApartments) {
        setSelectedApartment(availableApartments[0].data().title);
      }
    }
  };

  useEffect(() => {
    checkApartmentsAvailability();
  }, []);

  // Function to fetch discount codes from Firestore
  const fetchDiscountCodes = async () => {
    const codesCollection = collection(db, "AffiliateCodes");
    const snapshot = await getDocs(codesCollection);
    const codesList = [];
    snapshot.forEach((doc) => {
      codesList.push({ code: doc.data().code, rate: doc.data().discountRate });
    });
    setAffiliateCodes(codesList);
  };

  useEffect(() => {
    fetchDiscountCodes();
  }, []);

  // Function to handle discount code change
  const handleDiscountCodeChange = (e) => {
    const enteredCode = e.target.value;

    setCodeValidationMessage("");
    setIsCheckingCode(true);

    // Check if the entered code is six characters long
    if (enteredCode.length === 6) {
      // Check if the entered code matches any of the affiliate codes
      const appliedDiscount = affiliateCodes.find(
        (codeObj) => codeObj.code === enteredCode
      );

      // If the code matches, apply the discount
      if (appliedDiscount) {
        const discountRate = appliedDiscount.rate;
        const newPrice =
          calculateTotalPrice() - (calculateTotalPrice() * discountRate) / 100;
        console.log(newPrice);
        setDiscountedPrice(newPrice);
        setIsDiscountApplied(true);
        setIsCheckingCode(false);
        setCodeValidationMessage("Code Applied Successfully");
      } else {
        setDiscountedPrice(calculateTotalPrice());
        setIsCheckingCode(false);
        setCodeValidationMessage("Invalid Code");
      }
    } else {
      setDiscountedPrice(calculateTotalPrice());
      setIsCheckingCode(false);
      setCodeValidationMessage("Discount code should be 6 characters long");
    }

    // If the entered code is empty, reset the price
    if (enteredCode.length === 0) {
      setDiscountedPrice(calculateTotalPrice());
      setIsCheckingCode(false);
      setCodeValidationMessage("");
    }

    setCode(enteredCode);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a booking ID and order date
    const bookingId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderDate = new Date().toISOString().split("T")[0];

    const bookingData = {
      checkInDate,
      checkOutDate,
      guests,
      name,
      email,
      phone,
      code,
      totalPrice: isDiscountApplied ? discountedPrice : calculateTotalPrice(),
      status: "booked",
      bookingId,
      orderDate,
      apartment: selectedApartment,
    };

    // Add booking to Firestore
    const guestCollection = collection(db, "Guests"); // Reference to your Firestore collection

    try {
      setIsSubmitting(true); // Show loading state
      const docRef = await addDoc(guestCollection, bookingData);
      console.log("Booking added with ID: ", docRef.id);
      setIsSubmitting(false); // Hide loading state
      setBookingStatus("success"); // Show success message

      // Update the apartment status and bookings
      const apartmentsCollection = collection(db, "Apartments");
      const apartmentQuery = query(
        apartmentsCollection,
        where("title", "==", selectedApartment)
      );
      const apartmentQuerySnapshot = await getDocs(apartmentQuery);

      // If the apartment exists, update its status and bookings
      if (!apartmentQuerySnapshot.empty) {
        const apartmentDoc = apartmentQuerySnapshot.docs[0];
        const apartmentRef = apartmentDoc.ref;
        const apartmentData = apartmentDoc.data();

        const newBooking = { checkInDate, checkOutDate };
        const updatedBookings = [...apartmentData.bookings, newBooking];

        await updateDoc(apartmentRef, {
          status: "booked",
          bookings: updatedBookings,
        });
      }

      // Reset the form
      setCheckInDate(currentDate);
      setCheckOutDate(currentDate);
      setGuests(1);
      setName("");
      setEmail("");
      setPhone("");
      setCode("");
      setCodeValidationMessage("");
      setIsCheckingCode(false);
      setIsDiscountApplied(false);
      setDiscountedPrice(calculateTotalPrice());

      setIsSubmitting(false);
      setBookingStatus("");
    } catch (error) {
      setIsSubmitting(false); // Hide loading state
      setBookingStatus("error"); // Show error message
    }
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
                {isApartmentsAvailable ? (
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
                      <label htmlFor="phone">Discount Code</label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        value={code}
                        onChange={handleDiscountCodeChange}
                      />
                      {isCheckingCode && (
                        <span className="code-message">Checking code...</span>
                      )}
                      {codeValidationMessage && (
                        <span className="code-message">
                          {codeValidationMessage}
                        </span>
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
                        Total: ₦{" "}
                        {isDiscountApplied
                          ? discountedPrice
                          : calculateTotalPrice()}
                      </h3>
                    </div>
                    {/* Show a success message when the booking is successful */}
                    {bookingStatus === "success" && (
                      <div className="modal-status-message">
                        <p className="success-message">Booking successful!</p>
                      </div>
                    )}
                    {/* Show an error message if there was an error during submission */}
                    {bookingStatus === "error" && (
                      <p className="error-message code-message">
                        An error occurred. Please try again.
                      </p>
                    )}
                    <div className="form-group">
                      {/* Show a loading message while submitting */}
                      <button className="button-primary" type="submit">
                        {isSubmitting ? "Booking..." : "Book Now"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="no-apartments">No apartments available</p>
                )}
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
