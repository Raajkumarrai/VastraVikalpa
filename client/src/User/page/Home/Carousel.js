import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import EachPage from "../../common/Components/EachPage";
import { Typewriter } from "react-simple-typewriter";
import { Card } from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { LiaFacebookSquare } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io5";
import { RiYoutubeLine, RiLinkedinBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Carousel = ({ data }) => {
  let final = data
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  const scrollDown = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid relative">
        <div className="h-[500px] w-full grid grid-cols-12 bg-[#0f1019] relative">
          <div className="col-span-7 flex justify-center mt-5 items-center h-full">
            <div className="w-[80%] mt-4 ml-[10%] flex gap-1 flex-col">
              <h3 className="font-Orbitron tracking-wider text-white text-base font-semibold">
                Revamp Your Wardrobe with,
              </h3>
              <div className="font-Orbitron text-[#ea580c] tracking-wider uppercase text-[2.5rem] font-semibold">
                <Typewriter
                  words={[
                    "Stylish Picks",
                    "Authentic Designs",
                    "Affordable Choices",
                    "Nepali Fashion",
                  ]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={200}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </div>
              <p className="font-poppins w-[95%] text-sm text-white/80">
                Explore Vastra Vikalpa for trendy, authentic, and affordable
                Nepali fashion. Elevate your style with our curated collections,
                delivering quality designs at budget-friendly prices.
              </p>

              <div>
                <Card
                  variant="ghost"
                  color="primary"
                  className="uppercase font-gruppo inline-block rounded-none px-7 py-[0.6rem] mt-5 border  border-white/20 bg-transparent text-dark-color hover:border-white/20 hover:bg-white/15 text-sm tracking-wider hover:tracking-widest"
                  radius="none"
                  shadow="none"
                  isPressable
                  onClick={() => navigate("/t-shirt")}
                >
                  <div className="flex text-[#ea580c] justify-center gap-1 border-white/20 font-semibold duration-150 items-center">
                    Let's Go <FaArrowRight />
                  </div>
                </Card>
                <br />
                <Card
                  variant="ghost"
                  color="primary"
                  className="uppercase font-gruppo rounded-none py-[0.6rem] border  border-white/20 bg-transparent text-dark-color text-white/70 mt-10 w-[35px] h-[35px] flex justify-center items-center hover:border-white/20 hover:bg-white/15 text-sm tracking-wider hover:tracking-widest"
                  radius="none"
                  shadow="none"
                  isPressable
                  onClick={scrollDown}
                >
                  <FaChevronDown />
                </Card>
              </div>
            </div>
          </div>
          <div className=" w-full h-full col-span-5 flex justify-start items-center">
            <div className="w-[80%]">
              <Swiper
                spaceBetween={10}
                centeredSlides={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                // pagination={{
                //   clickable: true,
                // }}
                modules={[Autoplay]}
                // modules={[Autoplay, Pagination]}
                className="mySwiper w-full"
              >
                {final.map((e) => {
                  return (
                    <SwiperSlide key={e._id}>
                      <EachPage data={e} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className=" absolute right-5 top-0 w-[35px] h-[80%] z-[10] mt-12 flex flex-col gap-8 justify-center items-center">
            <div className="h-1/2 w-[.01rem] bg-white/20"></div>
            <Link to={"/"}>
              <LiaFacebookSquare className="text-[#ea580c] hover:text-[#9e5933] text-xl scale-110" />
            </Link>
            <Link to={"/"}>
              <IoLogoInstagram className="text-[#ea580c] hover:text-[#9e5933] text-lg" />
            </Link>
            <Link to={"/"}>
              <RiYoutubeLine className="text-[#ea580c] hover:text-[#9e5933] text-xl" />
            </Link>
            <Link to={"/"}>
              <RiLinkedinBoxLine className="text-[#ea580c] hover:text-[#9e5933] text-xl" />
            </Link>
            <div className="h-1/2 w-[.01rem] bg-white/20"></div>
          </div>
        </div>
        <div className=" custom-shape-divider-bottom-1706682717">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Carousel;
