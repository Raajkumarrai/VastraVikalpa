import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./common/Navigation/Navigation";
import Home from "./page/Home/Home";
import Footer from "./common/Navigation/Footer";
import Login from "./page/login/page";
import Register from "./page/register/page";
import Products from "./page/Products/page";
import Cart from "./page/cart/page";
import EachSite from "./page/EachSite/EachSite";
import Contact from "./page/Contact/Contact";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import MyAccount from "./page/myaccount/MyAccount";
import OrderTrack from "./page/OrderTrack/OrderTrack";
import PaymentSuccess from "./page/esewa/PaymentSuccess";
import PaymentFailed from "./page/esewa/PaymentFailed";
import Success from "./page/esewa/Success";

const PageUser = () => {
  const Location = useLocation().pathname;
  const [userData, setUserData] = useState({ isLogin: false, data: {} });
  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUserData({
        isLogin: true,
        data: JSON.parse(localStorage.getItem("data")),
      });
    } else {
      setUserData({
        isLogin: false,
        data: {},
      });
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("data")]);

  return (
    <>
      {!Location.includes("/dashboard") && (
        <div className="max-w-[1600px] mx-auto">
          <Navigation userData={userData} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/esewa_payment_success" element={<PaymentSuccess />} />
            <Route path="/success" element={<Success />} />
            <Route path="/esewa_payment_failed" element={<PaymentFailed />} />
            <Route path="/about-us" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Cart />} />
            <Route path="/checkout/:id" element={<Cart />} />
            <Route path="/myaccount/:id" element={<MyAccount />} />
            <Route path="/ordertrack" element={<OrderTrack />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/each/:category/:subcategory/:id"
              element={<EachSite />}
            />
            <Route path="/each/:category/:id" element={<EachSite />} />
            <Route path="/:category/:subcategory" element={<Products />} />
            <Route path="/:category" element={<Products />} />
          </Routes>
          <Footer />
        </div>
      )}
      <Toaster richColors position="top-right" closeButton />
    </>
  );
};

export default PageUser;
