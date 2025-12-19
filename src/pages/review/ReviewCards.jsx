import React from "react";
import { reviewData } from "./reviewData";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ReviewCards = () => {
  return (
    <div className="py-10 bg-blue-900">
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-300">
        ক্লায়েন্ট রিভিউ
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-6xl mx-auto"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}>
        {reviewData.map((item) => (
          <SwiperSlide key={item.id} className="p-6 w-full">
            <ReviewCard review={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCards;
