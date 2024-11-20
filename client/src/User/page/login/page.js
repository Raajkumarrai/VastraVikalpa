import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Input, Button, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "../../common/assets/jsx/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../common/assets/jsx/EyeSlashFilledIcon";
import { MailIcon } from "../../common/assets/jsx/MailIcon";
import Logo from "../../../assets/icons/logo.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const handelLogin = async (data) => {
    try {
      const response = await dispatch(loginUser(data));
      if (response.payload.token) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("data", JSON.stringify(response.payload.user));
        localStorage.setItem("token", JSON.stringify(response.payload.token));
        navigate("/");
        toast.success("User logged in successfully.");
      }
      if (response.payload?.error) {
        toast.error(response.payload.error);
      }
    } catch (error) {
      toast.error("Some error accuired, try again later");
      // console.error("Error creating post:", error);
    }
  };

  const formInputFieldChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const formsubmit = (e) => {
    e.preventDefault();
    handelLogin(userFormData);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="min-h-[200px] w-[400px] my-20 rounded ">
        <form onSubmit={formsubmit}>
          <Card
            radius="none"
            className="rounded-sm flex gap-5 flex-col p-8 font-poppins"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-black font-semibold tracking-wider text-2xl font-Orbitron">
                Sign In
              </h3>
              <img src={Logo} height={40} width={125} alt="logo" />
            </div>
            <h3 className="text-black/80 text-sm">Welcome back !!!</h3>
            <div className="flex gap-1 -mt-1 flex-col">
              <label
                htmlFor="email"
                className="text-sm text-black cursor-pointer"
              >
                Email
              </label>
              <Input
                size="sm"
                variant="faded"
                isRequired
                radius="sm"
                label="Email"
                type="email"
                name="email"
                value={userFormData.email}
                onChange={formInputFieldChange}
                endContent={
                  <MailIcon className="text-2xl mb-1 text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="flex gap-1 flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className="text-sm text-black cursor-pointer"
                >
                  Password
                </label>
                {/* <Link
                  to={"/"}
                  className="text-xs text-blue-400 hover:text-blue-500 duration-150"
                >
                  Forget Password?
                </Link> */}
              </div>
              <Input
                size="sm"
                variant="faded"
                label="Password"
                radius="sm"
                name="password"
                value={userFormData.password}
                onChange={formInputFieldChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl mb-1 text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                radius="none"
                className="rounded-sm"
                type="submit"
                endContent={<IoArrowForwardOutline />}
              >
                Signin
              </Button>
            </div>
            <div>
              <p className="text-xs text-black/80 tracking-wider  pb-2">
                Dont have account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-400 hover:text-blue-500 duration-150"
                >
                  Register
                </Link>
              </p>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;
