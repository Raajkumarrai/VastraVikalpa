import React, { useEffect, useState } from "react";
import { IoCallSharp, IoLogoInstagram } from "react-icons/io5";
import { LiaFacebookSquare } from "react-icons/lia";
import { MdEmail } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { RiLinkedinBoxLine, RiYoutubeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { postContacts } from "../../../redux/slices/messageSlice";
import { toast } from "sonner";

const Contact = () => {
  const dispatch = useDispatch();
  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollUP();
  }, []);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    title: "",
    msg: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handelChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handelPostContacts = async (data) => {
    try {
      const response = await dispatch(postContacts(data));
      if (response.payload?.success) {
        toast.success("Message sent successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot add Message");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newValidationErrors = {
      name: "",
      email: "",
      title: "",
      msg: "",
    };

    if (!contactData.name.trim()) {
      newValidationErrors.name = "Name is required.";
      isValid = false;
    }
    if (!contactData.email.trim()) {
      newValidationErrors.email = "Email is required.";
      isValid = false;
    }
    if (contactData.title.trim().length < 5) {
      newValidationErrors.title = "Title must be at least 5 characters long.";
      isValid = false;
    }
    if (contactData.msg.trim().length < 10) {
      newValidationErrors.msg = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);

    return isValid;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handelPostContacts(contactData);
      setContactData({
        name: "",
        email: "",
        title: "",
        msg: "",
      });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen px-5">
      <div className="relative h-full w-full">
        <div className="absolute top-0 h-[400px] rounded-b-md w-full border border-t-0 bg-[#0f1019] border-black/10 bgOpactity1"></div>
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 min-h-[400px] z-10 ">
            <div className="mt-[90px] w-[80%] float-right flex flex-col gap-4">
              <h3 className="text-xs font-poppins uppercase text-white font-semibold">
                Contact Us:
              </h3>
              <h2 className="font-gruppo font-semibold text-white/90 text-3xl">
                <span className="text-[#ea580c] font-semibold text-[2.3rem] mr-2">
                  Vastra Vikalpa:
                </span>
                Fuse creativity with pocket-friendly solutions for a remarkable
                online presence.
              </h2>
              <p className="text-sm font-poppins text-white/80">
                Send us a message and we'll get your questions answered as soon
                as possible.
              </p>
              <div>
                <button className="border px-7 py-3 rounded-full mt-2 gap-[2px] hover:cursor-pointer border-[#ea580c] text-[#ea580c] flex items-center hover:bg-[#ea580c] duration-200 hover:text-slate-100 font-semibold font-poppins text-sm">
                  <IoCallSharp className="text-base" />
                  <span>+977 9810000000</span>
                </button>
              </div>
              <div className="mt-14 flex flex-col gap-7">
                <div className="font-poppins flex flex-col gap-2">
                  <h3 className="text-black font-Orbitron font-semibold tracking-wider uppercase">
                    Contact us through
                  </h3>
                  <div className="flex flex-col gap-1 px-1">
                    <p className="text-sm flex gap-1 items-center text-blakc/80">
                      <MdEmail />
                      rrai86189@gmail.com
                    </p>
                    <p className="text-sm flex gap-1 items-center text-blakc/80">
                      <MdLocationPin />
                      Kathmandu Nepal
                    </p>
                    <p className="text-sm flex gap-1 items-center text-blakc/80">
                      <IoCallSharp />
                      +977 9810000000
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-black font-Orbitron font-semibold tracking-wider uppercase">
                    Social media
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <Link to={"/"}>
                      <LiaFacebookSquare className="text-primary-color hover:text-[var(--text-full-dark)] scale-125 text-2xl" />
                    </Link>
                    <Link to={"/"}>
                      <IoLogoInstagram className="text-primary-color hover:text-[var(--text-full-dark)] text-2xl" />
                    </Link>
                    <Link to={"/"}>
                      <RiYoutubeLine className="text-primary-color hover:text-[var(--text-full-dark)] scale-125 text-2xl" />
                    </Link>
                    <Link to={"/"}>
                      <RiLinkedinBoxLine className="text-primary-color hover:text-[var(--text-full-dark)] scale-125 text-2xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 min-h-[400px] flex justify-center items-center mt-[100px] z-10">
            <form onSubmit={formSubmit}>
              <Card className="rounded-sm">
                <div className="w-[450px] font-poppins rounded bg-white border border-black/10 shadow h-full p-6 flex gap-3 flex-col">
                  <h2 className="font-semibold uppercase text-blakc/80">
                    Contact Form
                  </h2>
                  <Input
                    name="name"
                    size="sm"
                    className="rounded-sm"
                    variant="faded"
                    type="text"
                    label="Your Name"
                    radius="none"
                    value={contactData.name}
                    onChange={handelChange}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-danger -mt-1 ml-1">
                      {validationErrors.name}
                    </p>
                  )}
                  <Input
                    name="email"
                    size="sm"
                    variant="faded"
                    type="email"
                    label="Your email"
                    radius="none"
                    value={contactData.email}
                    onChange={handelChange}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-danger -mt-1 ml-1">
                      {validationErrors.email}
                    </p>
                  )}
                  <Input
                    name="title"
                    size="sm"
                    variant="faded"
                    type="text"
                    label="Your Title"
                    radius="none"
                    value={contactData.title}
                    onChange={handelChange}
                  />
                  {validationErrors.title && (
                    <p className="text-xs text-danger -mt-1 ml-1">
                      {validationErrors.title}
                    </p>
                  )}
                  <div id="textarea1">
                    <Textarea
                      variant="faded"
                      // size="lg"
                      label="Your Message"
                      name="msg"
                      radius="none"
                      value={contactData.msg}
                      onChange={handelChange}
                    />
                  </div>
                  {validationErrors.msg && (
                    <p className="text-xs text-danger -mt-1 ml-1">
                      {validationErrors.msg}
                    </p>
                  )}
                  <Button
                    endContent={
                      <IoArrowForwardOutline className="text-xl scale-95 pt-[1px]" />
                    }
                    color="primary"
                    className="rounded-sm mb-2"
                    type="submit"
                  >
                    Submit your message{" "}
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
