import { RiHome3Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdChecklistRtl } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

import { IoClose } from "react-icons/io5";
import Drawer from "../components/Drawer";

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
            <a href="/">
              <RiHome3Line /> Home
            </a>
          </li>
          <li className="item">
            <a href="/">
              <MdChecklistRtl />
              Plane
            </a>
          </li>
          <li className="item">
            <a href="/">
              <GrGroup /> About
            </a>
          </li>
          <li className="item">
            <a href="/">
              <RiContactsBook2Line /> Contact
            </a>
          </li>
          <li>
            <ActionBtn btn={"btn-blue"}>
              <CiLogin /> Login
            </ActionBtn>
          </li>
          <li>
            <ActionBtn icon={""} btn={"btn-white"}>
              <MdOutlinePersonAdd /> Sign Up
            </ActionBtn>
          </li>
        </ul>
      </div>
    </nav>
  );
}
