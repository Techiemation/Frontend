import "./App.css";
import { useState } from "react";

// import { IoMenu } from "react-icons/io5";

import MobileNavbar from "./components/MobileNavbar";
import NavBar from "./components/Navbar";
import Home from "./components/Home";

export default function App() {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }
  return (
    <div className="app">
      <MobileNavbar
        mobileNavbar={mobileNavbar}
        onMobileNavbar={handleMobileNavbar}
      />
      <NavBar onMobileNavbar={handleMobileNavbar} />
      <Home />
    </div>
  );
}
