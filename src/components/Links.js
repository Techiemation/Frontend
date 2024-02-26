import ActionBtn from "../components/ActionBtn";

import { RiHome3Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdChecklistRtl } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";

// import { IoMenu } from "react-icons/io5";

export default function Links() {
  return (
    <div className="Links">
      <ul className="list">
        <li className="item">
          <Link to="/">
            <RiHome3Line /> Home
          </Link>
        </li>
        <li className="item">
          <Link to="/">
            <MdChecklistRtl />
            Plan
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
          <ActionBtn icon={""} btn={"btn-white"} link="/login-signup+">
            <MdOutlinePersonAdd /> Sign Up
          </ActionBtn>
        </li>
      </ul>
    </div>
  );
}
