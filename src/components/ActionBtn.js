import { Link } from "react-router-dom";
export default function ActionBtn({ btn, children, link }) {
  return (
    <Link to={link} className={`action-btn ${btn}`}>
      {children}
    </Link>
  );
}
