import "./Reviews.scss";
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useBookings from "../hooks/api/useBooking";
import { useEffect } from "react";

const Reviews = () => {
  const { reviews, getReviews } = useBookings();

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <section className="reviews">
      <div className="review-banner">
        <h2>"The authentic place for the best memories."</h2>
        <div className="reviews-heading">
          <h1>What Our Customers Are Saying:</h1>
        </div>
      </div>
      <div className="reviews-container">
        <div className="reviews-content">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {reviews.map((review) => {
              const {
                id,
                booking: { firstName, lastName },
                rating,
                comment: reviewText,
              } = review;
              return (
                <SwiperSlide key={id}>
                  <div className="review" key={id}>
                    <div className="stars">
                      {[...Array(rating)].map((_, index) => {
                        return <FaStar key={index} />;
                      })}
                    </div>
                    <div className="text">
                      <p>&ldquo;{reviewText}&rdquo;</p>
                    </div>
                    <div className="name">
                      <h3>
                        {firstName} {lastName}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
