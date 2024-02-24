import { RiHome3Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdChecklistRtl } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

import { IoClose } from "react-icons/io5";
import Drawer from "../components/Drawer";
import { Link } from "react-router-dom";

import ActionBtn from "../components/ActionBtn";

export default function MobileNavbar({ mobileNavbar, onMobileNavbar }) {
  return (
    <nav className={`mobile-nav-bar ${mobileNavbar ? "show" : ""}`}>
      <div className="head">
        <Drawer onMobileNavbar={onMobileNavbar}>
          <IoClose className="menu-icon" />
        </Drawer>
      </div>
      <div className="nav-body">
        <ul>
          <li className="item">
            <Link to="/">
              <RiHome3Line /> Home
            </Link>
          </li>
          <li className="item">
            <Link to="/">
              <MdChecklistRtl />
              Plane
            </Link>
          </li>
          <li className="item">
            <Link to="/about-us">
              <GrGroup /> About
            </Link>
          </li>
          <li className="item">
            <Link to="/contact-us">
              <RiContactsBook2Line /> Contact
            </Link>
          </li>
          <li>
            <ActionBtn btn={"btn-blue"} link="/login-signup">
              <CiLogin /> Login
            </ActionBtn>
          </li>
          <li>
            <ActionBtn icon={""} btn={"btn-white"} link="/login-signup">
              <MdOutlinePersonAdd /> Sign Up
            </ActionBtn>
          </li>
        </ul>
      </div>
    </nav>
  );
}
