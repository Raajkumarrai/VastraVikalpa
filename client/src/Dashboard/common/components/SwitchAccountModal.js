import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../../User/common/assets/jsx/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "../../../User/common/assets/jsx/EyeFilledIcon.jsx";
import { MailIcon } from "../../../User/common/assets/jsx/MailIcon";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SwitchAccountModal({ btnRef }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const btnref = useRef();
  const dispatch = useDispatch();
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handelLogin = async (data) => {
    try {
      const response = await dispatch(loginUser(data));
      if (response.payload?.msg) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("data", JSON.stringify(response.payload.user));
        localStorage.setItem("token", JSON.stringify(response.payload.token));
        btnref.current.click();
        toast.success("User registered successfully");
        navigate("/dashboard/");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot register user");
      }
    } catch (error) {
      toast.error("Some error occurred " + error);
    }
  };

  const formInputFieldChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });

    // Add validation logic
    switch (name) {
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value),
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: validatePassword(value),
        }));
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const formsubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handelLogin(userFormData);
    }
  };

  const validateForm = () => {
    // Validate each field and update the error state
    const emailError = validateEmail(userFormData.email);
    const passwordError = validatePassword(userFormData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const clearCategoryData = () => {
    setUserFormData({ email: "", password: "" });
    setErrors({ email: "", password: "" });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" className="hidden" ref={btnRef}>
        Open Modal
      </Button>
      <Modal
        radius="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={() => {
          clearCategoryData();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={formsubmit}>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  radius="sm"
                  name="email"
                  value={userFormData.email}
                  onChange={formInputFieldChange}
                  error={errors.email}
                />
                <p className="text-red-500 text-small -mt-3 ml-1">
                  {errors.email}
                </p>
                <Input
                  label="Password"
                  radius="sm"
                  placeholder="Enter your password"
                  name="password"
                  value={userFormData.password}
                  onChange={formInputFieldChange}
                  variant="bordered"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  error={errors.password}
                />
                <p className="text-red-500 text-small -mt-3 ml-1">
                  {errors.password}
                </p>

                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  radius="sm"
                  variant="flat"
                  onPress={onClose}
                  type="reset"
                  ref={btnref}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  radius="sm"
                  // onPress={onClose}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
