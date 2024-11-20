import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../../assets/icons/logo.svg";
import { Badge, Card } from "@nextui-org/react";
// import Subcategory from "./Subcategory";
import Profile from "../Components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getCategorys } from "../../../redux/slices/categorySlice";
import { getsubcategorys } from "../../../redux/slices/subCategorySlice";
import SubcategorySmall from "./SubcategorySmall";
import URLConverter from "../../../libs/URLConverter";
import ProductContext from "../../../context/productContext/ProductContext";

const Navigation = ({ userData }) => {
  const { orderData, checkoutPop } = useContext(ProductContext);
  let finalorderData = orderData.filter(
    (e) => !checkoutPop.some((popItem) => popItem.productId === e.productId)
  );

  const Location = useLocation().pathname;
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================== get all data from backend =========================

  const { data } = useSelector((state) => state.categoryReducer);
  const { subcatData } = useSelector((state) => state.subcategoryReducer);

  const userRef = useRef(false);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getsubcategorys());
      dispatch(getCategorys());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  const navData = data
    .filter(
      (e) => e.categoryName.toLowerCase() !== "home" && e.showTop === true
    )
    .map((category) => {
      const subcategories = subcatData.filter(
        (subcategory) => subcategory.categoryId === category._id
      );
      return {
        ...category,
        subcategories,
      };
    });

  return (
    <>
      <div className="sticky bg-slate-50 shadow font-poppins top-0 z-50">
        <div className="h-[55px] w-full border-b border-dark-color">
          <div className="flex w-[95%] mx-auto justify-between items-center h-full">
            <div className="flex gap-20  h-full">
              <div className="logo flex justify-center items-center h-full">
                <img src={Logo} height={40} width={115} alt="logo" />
              </div>
              <ul className="flex text-sm justify-center gap-5 items-center">
                {/* <li>
                  <Link
                    className={`${
                      Location.toLowerCase() === "/"
                        ? "text-black"
                        : "text-slate-700"
                    } relative hover:text-black py-2 `}
                    to={"/"}
                  >
                    Home
                    {Location.toLowerCase() === "/" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    className={` ${
                      Location.toLowerCase() === "/about-us"
                        ? "text-black"
                        : "text-slate-700"
                    } hover:text-black relative py-2 `}
                    to={"/about-us"}
                  >
                    About
                    {Location.toLowerCase() === "/about-us" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                </li> */}
                <li>
                  <Link
                    className={` ${
                      Location.toLowerCase() === "/"
                        ? "text-black"
                        : "text-slate-700"
                    } hover:text-black relative py-2 `}
                    to={"/"}
                  >
                    Home
                    {Location.toLowerCase() === "/" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                </li>
                {navData
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((e) => {
                    return (
                      <li className="relative group" key={e._id}>
                        <Link
                          to={
                            e.subcategories.length <= 0
                              ? `/${URLConverter(e.categoryName)}`
                              : false
                          }
                          className={`${
                            Location.toLowerCase().includes(
                              `/${URLConverter(e.categoryName)}`
                            )
                              ? "text-black"
                              : "text-slate-700"
                          } hover:text-black capitalize flex relative justify-start py-2  items-center gap-[1px] itemHover`}
                        >
                          {e.categoryName}
                          {e.subcategories.length > 0 && (
                            <IoIosArrowDown className="mt-[3px] text-base group-hover:rotate-180 duration-150" />
                          )}
                          {Location.toLowerCase().includes(
                            `/${URLConverter(e.categoryName)}`
                          ) && (
                            <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                          )}
                        </Link>
                        {e.subcategories.length > 0 && (
                          <div className="hidden group-hover:block">
                            <SubcategorySmall
                              category={e.categoryName}
                              subcategories={e.subcategories}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}

                {/* <li>
                  <Link
                    className={` ${
                      Location.toLowerCase() === "/contact"
                        ? "text-black"
                        : "text-slate-700"
                    } hover:text-black relative py-2 `}
                    to={"/contact"}
                  >
                    Contact
                    {Location.toLowerCase() === "/contact" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="profile text-sm flex justify-center items-center gap-5">
              <div className="scale-75">
                {/* <ThemeChange
                  setColorChange={setColorChange}
                  colorChange={colorChange}
                /> */}
              </div>
              {!userData.isLogin ? (
                <>
                  <div className="h-[20px] w-[1px] border-r border-black/15" />
                  <Link
                    to={"/login"}
                    className={`login py-[.6rem] !text-xs w-1/3 relative ${
                      Location.toLowerCase().includes("login")
                        ? "text-black"
                        : "text-black/80"
                    } `}
                  >
                    Login
                    {Location.toLowerCase() === "/login" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                  <div className="h-[20px] w-[1px] border-r border-black/15" />
                  <Link
                    to={"/register"}
                    className={`login py-[.6rem] !text-xs w-1/3 relative ${
                      Location.toLowerCase().includes("register")
                        ? "text-black"
                        : "text-black/80"
                    } `}
                  >
                    Signup
                    {Location.toLowerCase() === "/register" && (
                      <div className="h-[2px] absolute bottom-1 bg-black/80 rounded-r w-[20px]"></div>
                    )}
                  </Link>
                  <div className="h-[20px] w-[1px] border-r border-black/15" />
                </>
              ) : (
                <>
                  <Link to={"/cart"} className="w-1/3">
                    <Badge
                      content={finalorderData.length || 0}
                      size="sm"
                      color="danger"
                    >
                      <IoMdCart
                        className={`login text-2xl ${
                          Location.toLowerCase().includes("cart")
                            ? "text-black"
                            : "text-black/70"
                        } `}
                      />
                    </Badge>
                  </Link>
                  <div className="h-[20px] w-[1px] border-r border-black/15" />
                  <Profile userData={userData} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {scrollY > 700 && (
        <Card
          variant="ghost"
          color="primary"
          className="uppercase z-[1000000] fixed w-[35px] rotate-180 h-[35px] bottom-[40vh] text-white bg-[#0f1019] hover:bg-[#000000] right-10 font-gruppo rounded-none flex border-white/20 justify-center items-center mt-5 border text-sm tracking-wider hover:tracking-widest"
          radius="none"
          shadow="none"
          isPressable
          onClick={scrollUP}
        >
          <div className="flex text-white justify-center gap-1 border-white/20  duration-150 items-center">
            <IoIosArrowDown className="text-xl" />
          </div>
        </Card>
      )}
    </>
  );
};

export default Navigation;
