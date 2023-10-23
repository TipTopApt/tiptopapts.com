import "./Reviews.scss";
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    review:
      "This place is great! I had a very pleasant stay here. Great stuff and beautiful suites with a fabulous view!",
  },
  {
    id: 2,
    name: "Jane Doe",
    rating: 5,
    review:
      "Been there with my family. Beautiful place, definitely recommended. Children also enjoyed it very much",
  },
  {
    id: 3,
    name: "James Doe",
    rating: 5,
    review:
      "After a long day of hiking we finally arrived at TipTop and the experience was amazing. So many activities that helped us relax after such a long day. It was a very pleasant stay!",
  },
  {
    id: 4,
    name: "Judy Doe",
    rating: 5,
    review:
      "TipTop is definitely the best place to stay in the area. The staff is very friendly and the suites are just amazing!",
  },
  {
    id: 5,
    name: "Jill Doe",
    rating: 5,
    review:
      "Henceforth whenever I am in Abuja, I will be staying at TipTop. There is everything I need. No doubt it is home away from home.",
  },
];

const Reviews = () => {
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
              const { id, name, rating, review: reviewText } = review;
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
                      <h3>{name}</h3>
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
