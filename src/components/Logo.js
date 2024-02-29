import whiteLogo from "../resourses/Logo/whiteLogo2.png";
import { Link } from "react-router-dom";

export default function Logo({ logo = whiteLogo }) {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="logo" />
    </Link>
  );
}
