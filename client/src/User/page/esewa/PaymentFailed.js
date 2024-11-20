import React from "react";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="bg-gray-100 h-[300px]">
          <div className="bg-white p-6 flex justify-center items-center flex-col md:mx-auto">
            <MdError className="text-[4.5rem] mb-5 text-danger" />
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-red-800 font-semibold text-center">
                Order Failed
              </h3>
              <p className="text-gray-600 my-2">
                We're sorry, but there was an issue processing your order.
              </p>
              <p>Please try again later.</p>

              <div className="py-10 text-center">
                <Button
                  startContent={<FaArrowLeft />}
                  color="danger"
                  radius="full"
                  variant="solid"
                  onClick={() => navigate("/")}
                >
                  Back To Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
