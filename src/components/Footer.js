import { FaFacebook } from "react-icons/fa";
// import { TiSocialFacebookCircular } from "react-icons/ti";

import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

import { FaYoutube } from "react-icons/fa";
// import { AiOutlineYoutube } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-media-icon">
        <a href="www.facebook.com">
          <FaFacebook className="footer-icon" />
        </a>
        <a href="/">
          <FaInstagram className="footer-icon" />
        </a>
        <a href="/">
          <BsTwitterX className="footer-icon" />
        </a>
        <a href="/">
          <FaYoutube className="footer-icon" />
        </a>
      </div>
      <div className="copy-right">
        Copyright © 2024 Techiemation | All Rights Reserved
      </div>
    </div>
  );
}
