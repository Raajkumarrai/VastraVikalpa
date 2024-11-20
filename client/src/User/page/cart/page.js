import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductContext from "../../../context/productContext/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/slices/authSlice";
import { getproducts } from "../../../redux/slices/productSlice";
import Cart from "./Cart";
import Checkout from "../Checkout/Checkout";

const Page = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const {
    orderData,
    setSummaryData,
    isOrderNow,
    setIsOrderNow,
    setCheckoutPop,
  } = useContext(ProductContext);
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const { allUserData } = useSelector((state) => state.authReducer);
  const { productData } = useSelector((state) => state.productReducer);

  const [finalTable, setFinalTable] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [updateSummary, setUpdateSummary] = useState([]);

  const shipping = 100;

  useEffect(() => {
    const joinedData = orderData.map((order, index) => {
      const user = allUserData.find((user) => user._id === order.userId);
      const product = productData.find((prod) => prod._id === order.productId);
      return {
        ...order,
        user,
        product,
        sn: index + 1,
      };
    });
    setFinalTable(joinedData);
  }, [allUserData, productData, orderData]);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getUsers());
      dispatch(getproducts());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  useEffect(() => {
    let newSubtotal = 0;
    let finaltabledata = finalTable?.filter((e) => e?.product?.maxQuantity > 0);
    const newSummaryData = finaltabledata.map((e) => {
      const afterDiscount = getActualVal(
        e?.product?.price,
        e?.quantity,
        e?.product?.discount
      );
      newSubtotal += afterDiscount;
      return { productName: e?.product?.title, price: afterDiscount };
    });
    setSubtotal(newSubtotal);
    setUpdateSummary(newSummaryData);
    if (!isOrderNow) {
      setSummaryData(newSummaryData);
    }
  }, [finalTable, setSummaryData, isOrderNow]);

  const getActualVal = (price, quantity, discount) => {
    let totalprice = price * quantity;
    return totalprice - (totalprice * discount) / 100;
  };

  useEffect(() => {
    let data = finalTable?.filter((e) => e?.product?.maxQuantity <= 0);
    setCheckoutPop((prevData) => [...prevData, ...data]);
  }, [finalTable, setCheckoutPop]);

  return (
    <>
      {path.includes("cart") ? (
        <Cart
          finalTable={finalTable?.filter((e) => e?.product?.maxQuantity > 0)}
          navigate={navigate}
          subtotal={subtotal}
          shipping={shipping}
          setIsOrderNow={setIsOrderNow}
          updateSummary={updateSummary}
          isOrderNow={isOrderNow}
          setSummaryData={setSummaryData}
        />
      ) : (
        <Checkout finalTable={finalTable} />
      )}
    </>
  );
};

export default Page;
