export default function ActionBtn({ btn, children }) {
  return (
    <a href="/" className={`action-btn ${btn}`}>
      {children}
    </a>
  );
}
