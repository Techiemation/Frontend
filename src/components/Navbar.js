import Logo from "../components/Logo";
import Links from "../components/Links";
import Drawer from "../components/Drawer";
import { IoMenu } from "react-icons/io5";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function NavBar({ onMobileNavbar }) {
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
    <div className="nav-bar">
      <Logo />
      <Links user={user} onSignOut={handleSignOut} />
      <Drawer onMobileNavbar={onMobileNavbar}>
        <IoMenu className="menu-icon" />
      </Drawer>
    </div>
  );
}
