import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import paymentImage from "../resourses/illustration/8174445_3857457.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";

import { FiSend } from "react-icons/fi";

export default function Payment() {
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

      <main className="contact">
        <div className="container">
          <SectionHeading shortheading={"payment"} mainHeading={"Details"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={paymentImage} alt="payment" className="contact-image" />
              <form action="">
                <label className="field-label-head">Payment Method:</label>
                <div className="field-container">
                  <div className="field">
                    <label htmlFor="" className="field-label">
                      Card Number
                    </label>
                    <input type="text" name="" id="" className="input-field" />
                  </div>
                  <div className="field">
                    <label htmlFor="" className="field-label">
                      Postal Code
                    </label>
                    <input type="text" name="" id="" className="input-field" />
                  </div>
                </div>
                <div className="field-container">
                  <div className="field">
                    <label htmlFor="" className="field-label">
                      Expiration Date
                    </label>
                    <input type="text" name="" id="" className="input-field" />
                  </div>
                  <div className="field">
                    <label htmlFor="" className="field-label">
                      CVV
                    </label>
                    <input type="text" name="" id="" className="input-field" />
                  </div>
                </div>
                <br />
                <ActionBtn icon={""} btn={"btn-white"}>
                  Subscribe <FiSend />
                </ActionBtn>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
