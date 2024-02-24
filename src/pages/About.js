import Idea from "../components/idea";
import NavBar from "../components/Navbar";
import Team from "../components/Team";
import Technology from "../components/Technology";
import MobileNavbar from "../components/MobileNavbar";
import { useState } from "react";
import Footer from "../components/Footer";

export default function About() {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  return (
    <>
      <MobileNavbar
        mobileNavbar={mobileNavbar}
        onMobileNavbar={handleMobileNavbar}
      />
      <NavBar onMobileNavbar={handleMobileNavbar} />
      <main className="about">
        <Idea />
        <Team />
        <Technology />
      </main>
      <Footer />
    </>
  );
}
