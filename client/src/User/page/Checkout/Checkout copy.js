import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../../context/productContext/ProductContext";
import UserData from "./UserData";

const Checkout = ({ finalTable }) => {
  const { summaryData, postOrderAddresses, setRender, finalOrder } =
    useContext(ProductContext);

  let subtotal = summaryData.reduce((acc, cur) => acc + cur.price, 0);
  let shipping = 100;

  const [deliveryData, setDeliveryData] = useState({
    fName: "",
    email: "",
    mobileNumber: "",
    province: "",
    city: "",
    area: "",
    address: "",
    landmark: "",
  });
  const [errors, setErrors] = useState({});

  const inputvalueChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [showAddress, setShowAddress] = useState(false);
  const { alluserAddress } = useContext(ProductContext);
  const [oneUserAddress, setOneUserAddress] = useState({});

  useEffect(() => {
    if (alluserAddress.length > 0) {
      let userId = JSON.parse(localStorage.getItem("data"))?._id || null;
      let reversedAddresses = [...alluserAddress].reverse(); // Reversing the array
      let mydata = reversedAddresses.find(
        (e) => String(e.userId) === String(userId)
      );
      setOneUserAddress(mydata);
    }
  }, [alluserAddress, oneUserAddress]);

  useEffect(() => {
    if (oneUserAddress?.fName) {
      setShowAddress(true);
    } else {
      setShowAddress(false);
    }
  }, [oneUserAddress]);

  useEffect(() => {
    if (oneUserAddress?.fName) {
      setDeliveryData({
        ...deliveryData,
        fName: oneUserAddress.fName,
        email: oneUserAddress.email,
        mobileNumber: oneUserAddress.mobileNumber,
        area: oneUserAddress.area,
        address: oneUserAddress.address,
        landmark: oneUserAddress.landmark,
        city: oneUserAddress.city,
        province: oneUserAddress.province,
      });
    }
    // eslint-disable-next-line
  }, [oneUserAddress]);

  const placeOrderBtnclk = async (paymentMethod) => {
    if (paymentMethod === "esewa") {
      if (validateForm()) {
        let addressId = "";
        if (!showAddress) {
          let res = await postOrderAddresses(deliveryData);
          addressId = res?.addId;
          setRender((p) => !p);
        } else {
          addressId = oneUserAddress._id;
        }
        const result = finalTable.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        const orderFinal = {
          products: result,
          detailId: addressId,
          // billing: false,
        };

        finalOrder(orderFinal, false);
        return;
      }
    } else {
      if (validateForm()) {
        let addressId = "";
        if (!showAddress) {
          let res = await postOrderAddresses(deliveryData);
          addressId = res?.addId;
          setRender((p) => !p);
        } else {
          addressId = oneUserAddress._id;
        }
        const result = finalTable.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        const orderFinal = {
          products: result,
          detailId: addressId,
          // billing: false,
        };

        finalOrder(orderFinal, true);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    for (const key in deliveryData) {
      if (!deliveryData[key]) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(deliveryData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    const mobilePattern = /^(97|98)/;
    if (!mobilePattern.test(deliveryData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must start with 97 or 98";
      isValid = false;
    } else if (deliveryData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits long";
      isValid = false;
    }
    newErrors.mobileNumber = deliveryData.mobileNumber;

    if (deliveryData.city?.length < 3) {
      newErrors.city = "City must be at least 3 characters";
      isValid = false;
    }
    if (deliveryData.area?.length < 3) {
      newErrors.area = "Area must be at least 3 characters";
      isValid = false;
    }
    if (deliveryData.address?.length < 3) {
      newErrors.address = "Full Address must be at least 3 characters";
      isValid = false;
    }
    if (deliveryData.landmark?.length < 3) {
      newErrors.landmark = "Landmark must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <UserData
        deliveryData={deliveryData}
        inputvalueChange={inputvalueChange}
        errors={errors}
        summaryData={summaryData}
        subtotal={subtotal}
        shipping={shipping}
        placeOrderBtnclk={placeOrderBtnclk}
        setDeliveryData={setDeliveryData}
        oneUserAddress={oneUserAddress}
        showAddress={showAddress}
        setShowAddress={setShowAddress}
      />
    </>
  );
};

export default Checkout;
