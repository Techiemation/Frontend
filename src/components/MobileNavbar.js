import { RiHome3Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdChecklistRtl } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Drawer from "../components/Drawer";

import { Link } from "react-router-dom";
import ActionBtn from "../components/ActionBtn";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function MobileNavbar({ mobileNavbar, onMobileNavbar }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        logout();
        navigate("/login-signup");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Link to="/plan">
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

          {user ? (
            <>
              <li>
                <ActionBtn btn={"btn-white"} link="/userProfile">
                  <FiUser /> {user}
                </ActionBtn>
              </li>
              <li>
                <ActionBtn icon={""} btn={"btn-blue"} onClick={handleSignOut}>
                  <PiSignOutBold /> Sign Out
                </ActionBtn>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
