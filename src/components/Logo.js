import whiteLogo from "../resourses/Logo/whiteLogo2.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src={whiteLogo} alt="logo" className="logo" />
    </Link>
  );
}
