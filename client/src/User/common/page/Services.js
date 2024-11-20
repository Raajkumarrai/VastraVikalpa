import React, { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Cards from "../Cards/CardsService";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import GetHighlights from "../../../libs/GetHighlights";
SwiperCore.use([Navigation, Pagination]);

const Services = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const datares = await GetHighlights();
    setData(datares);
  };

  return (
    <div className="h-full py-5">
      <div className="flex items-center gap-2 mt-5 mb-8">
        <span className="uppercase text-nowrap text-black/80 font-Orbitron tracking-wider">
          Key Highlights
        </span>
        <div className="w-full h-[1px] border-b border-dashed border-black/30"></div>
      </div>
      <Swiper
        slidesPerView={6}
        loop
        spaceBetween={10}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {data.map((e) => {
          return (
            <SwiperSlide key={e._id}>
              <Cards data={e} />
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Services;
