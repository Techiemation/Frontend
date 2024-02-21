import ActionBtn from "../components/ActionBtn";

import { RiHome3Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdChecklistRtl } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";

export default function Links() {
  return (
    <div className="Links">
      <ul className="list">
        <li className="item">
          <a href="/">
            <RiHome3Line /> Home
          </a>
        </li>
        <li className="item">
          <a href="/">
            <MdChecklistRtl />
            Plan
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
  );
}
