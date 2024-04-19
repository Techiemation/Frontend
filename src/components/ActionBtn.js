import { Link } from "react-router-dom";
export default function ActionBtn({ btn, children, link, onClick }) {
  return (
    <Link to={link} className={`action-btn ${btn}`} onClick={onClick}>
      {children}
    </Link>
  );
}
