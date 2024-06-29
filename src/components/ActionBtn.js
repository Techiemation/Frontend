import { Link } from "react-router-dom";
export default function ActionBtn({ btn, children, link, onClick, type }) {
  return (
    <Link
      to={link}
      className={`action-btn ${btn}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </Link>
  );
}
