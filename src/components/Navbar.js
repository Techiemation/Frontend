import Logo from "../components/Logo";
import Links from "../components/Links";
import Drawer from "../components/Drawer";
import { IoMenu } from "react-icons/io5";

export default function NavBar({ onMobileNavbar }) {
  return (
    <div className="nav-bar">
      <Logo />
      <Links />
      <Drawer onMobileNavbar={onMobileNavbar}>
        <IoMenu className="menu-icon" />
      </Drawer>
    </div>
  );
}
