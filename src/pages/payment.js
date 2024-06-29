import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import paymentImage from "../resourses/illustration/8174445_3857457.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";

import { FiSend } from "react-icons/fi";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Payment({ plan_ = "Basic" }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const location = useLocation();

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  // Scrolls to the top of the page when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <MobileNavbar
        mobileNavbar={mobileNavbar}
        onMobileNavbar={handleMobileNavbar}
      />
      <NavBar onMobileNavbar={handleMobileNavbar} />

      <main className="contact">
        <div className="container">
          <SectionHeading shortheading={"Enterprise "} mainHeading={"Plan"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={paymentImage} alt="payment" className="contact-image" />

              <form action="" className="">
                <div className="input-container">
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="first-name" className="field-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        name=""
                        id="first-name"
                        className="input-field"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="last-name" className="field-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        name=""
                        id="last-name"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="" className="field-label">
                        Company:
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="input-field"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="mobile-no" className="field-label">
                        Mobile Number:
                      </label>
                      <input
                        type="tel"
                        name=""
                        id="mobile-no"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="field textArea">
                    <label htmlFor="" className="field-label">
                      Base plan requirement:
                    </label>
                    <textarea
                      name=""
                      id=""
                      className=""
                      placeholder="Want an enterprise solution?
                      &oline;
                      Techiemation Offers end to end custom service for businesses of all sizes. Contact us today to discover how we can help achieve your goals."
                    ></textarea>
                  </div>
                </div>

                <ActionBtn icon={""} btn={"btn-white"}>
                  <FiSend /> Send
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
