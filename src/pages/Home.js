import Hero from "../components/Hero";
import Features from "../components/Features";
import Quote from "../components/Quote";
// import Plan from "../components/Plan";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileNavbar from "../components/MobileNavbar";
import { useState } from "react";

export default function Home() {
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
      <main>
        <Hero />
        <Features />
        <Quote />
        {/* <Plan /> */}
      </main>
      <Footer />
    </>
  );
}
