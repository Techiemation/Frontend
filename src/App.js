import "./App.css";
import { useState } from "react";

import MobileNavbar from "./components/MobileNavbar";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginSignUp from "./pages/login-signup";
import Prompt from "./pages/prompt";
import Footer from "./components/Footer";

export default function App() {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }
  return (
    <div className="app">
      {/* <MobileNavbar
        mobileNavbar={mobileNavbar}
        onMobileNavbar={handleMobileNavbar}
      />
      <NavBar onMobileNavbar={handleMobileNavbar} /> */}
      <Home />
      {/* <Footer /> */}
    </div>
  );
}
