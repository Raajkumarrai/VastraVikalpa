import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  return isDashboard ? (
    <footer>{/* <div>Footer Dashboard</div> */}</footer>
  ) : null;
};

export default Footer;
