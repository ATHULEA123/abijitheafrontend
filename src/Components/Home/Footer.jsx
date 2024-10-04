import React from "react";
import phone from "../../assets/phone.png";
import insta from "../../assets/insta.png";
import utube from "../../assets/utube.png";
import email from "../../assets/email.png";
import "./footer.css"
const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center my-12">
  <h3 className="text-xl font-light mb-5 text-white">LET'S CONNECT</h3>
  <p className="text-sm font-light mb-3 text-white text-center">
    I'm always open to artworks, collaboration, commissions or just a chat
    about art!
  </p>
  <div className="flex space-x-4">
    <a href="tel:+917034349362">
      <img src={phone} alt="phone" className="w-12 h-12 animate-logo logo" />
    </a>
    <a href="https://www.instagram.com/abijith_e_a" target="_blank">
      <img src={insta} alt="insta" className="w-10 h-10 mt-1 animate-logo logo" />
    </a>
    <a href="https://www.youtube.com/@abijith.e.a">
      <img src={utube} alt="utube" className="w-12 h-12 animate-logo logo" />
    </a>
    <a href="mailto:eaabijith3@gmail.com" target="_blank">
      <img src={email} alt="email" className="logo w-12 h-12 animate-logo " />
    </a>
  </div>
</div>

  );
};

export default Footer;
