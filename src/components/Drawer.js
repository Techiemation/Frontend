import React from "react";

export default function Drawer({ children, onMobileNavbar }) {
  return (
    <div className="menu-icon" onClick={onMobileNavbar}>
      {children}
    </div>
  );
}
