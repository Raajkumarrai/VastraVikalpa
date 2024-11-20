import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Pages/dashboard/page";
import Category from "./Pages/Lists/category/Category";
import Subcategory from "./Pages/Lists/subcategory/Page";
import Banner from "./Pages/Lists/banner/Page";
import Products from "./Pages/Lists/products/Page";
import TopNav from "./common/Navigation/TopNav";
import BarChart from "./Pages/Stats/barchart/Page";
import FilledChart from "./Pages/Stats/filledchart/Page";
import LineChart from "./Pages/Stats/linechart/Page";
import Profile from "./Pages/User/profile/Page";
import Users from "./Pages/User/users/Page";
import Message from "./Pages/Useful/message/Page";
import Orders from "./Pages/Useful/orders/Page";
import Delivery from "./Pages/Useful/delivery/page";
import Finished from "./Pages/Useful/finished/Page";
import EachMsg from "./Pages/Useful/message/EachMsg/EachMsg";
import Profileid from "./Pages/User/profile/Profileid/Profileid";

const PageDashboard = ({ setProgress }) => {
  const [hamClick, setHamClick] = useState(false);
  const Location = useLocation().pathname;
  return (
    <>
      {Location.includes("/dashboard") && (
        <>
          <TopNav setHamClick={setHamClick} hamClick={hamClick} />
          <div
            className={`${
              hamClick ? "ml-[50px]" : "ml-[180px]"
            } duration-200 py-3 px-5 bg-white !text-black`}
          >
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/category"
                element={<Category setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/subcategory"
                element={<Subcategory setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/banner"
                element={<Banner setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/products"
                element={<Products setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/filledchart"
                element={<FilledChart setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/linechart"
                element={<LineChart setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/barchart"
                element={<BarChart setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/users"
                element={<Users setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/profile"
                element={<Profile setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/profile/:id"
                element={<Profileid setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/message"
                element={<Message setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/message/:id"
                element={<EachMsg setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/orders"
                element={<Orders setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/delivery"
                element={<Delivery setProgress={setProgress} />}
              />
              <Route
                path="/dashboard/finished"
                element={<Finished setProgress={setProgress} />}
              />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default PageDashboard;
