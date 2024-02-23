import "./App.css";
import { useState } from "react";

import MobileNavbar from "./components/MobileNavbar";
import NavBar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

      <Contact />
      {/* <About /> */}
      {/* <Home /> */}
      {/* <About /> */}
      <Footer />
    </div>
  );
}
