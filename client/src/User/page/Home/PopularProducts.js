import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import EachPopularProduct from "../../common/Components/EachPopularProduct";

const PopularProducts = () => {
  return (
    <div className=" bg-transparent my-5">
      <div className="row px-xl-5 flex justify-start bg-transparent items-center">
        <Swiper
          spaceBetween={10}
          direction="horizontal"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={6}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
          <SwiperSlide>
            <EachPopularProduct />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default PopularProducts;
