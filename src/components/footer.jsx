import React from "react";
import footer_logo from "../assets/logos/visang_logo_footer.png"

const Footer = () => {
  return (
    <>
      <footer className="footer p-5 bg-base-200 ">
        <div className="flex justify-start items-center">
          <img src={footer_logo} className="h-10"/>
          <p className="font-bold">
           | Data Platform Cell 제공
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
