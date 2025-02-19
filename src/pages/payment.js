import SectionHeading from "../components/SectionHeading";
import paymentImage from "../resourses/illustration/8174445_3857457.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

import { FiSend } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import React from "react";
import { useForm } from "@formspree/react";

export default function Payment() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [mobileNo, setMoblieNo] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [state, handleSubmit] = useForm("mqazkzlj");

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  useEffect(() => {
    if (state.succeeded) {
      onSubmit();
    }
  }, [state.succeeded]);

  function onSubmit() {
    setFirstname("");
    setLastname("");
    setCompany("");
    setMoblieNo("");
    setPlanMessage("");

    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
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
          <SectionHeading shortheading={"Enterprise "} mainHeading={"Plan"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={paymentImage} alt="payment" className="contact-image" />
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="firstname" className="field-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="lastname" className="field-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="company" className="field-label">
                        Company:
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="mobile-no" className="field-label">
                        Mobile Number:
                      </label>
                      <input
                        type="tel"
                        name="mobile-no"
                        id="mobile-no"
                        value={mobileNo}
                        onChange={(e) => setMoblieNo(e.target.value)}
                        pattern="[0-9]{11}"
                        // onInvalid={(e) =>
                        //   e.target.setCustomValidity(
                        //     "Please enter a valid 11-digit mobile number."
                        //   )
                        // }
                        // onInput={(e) => e.target.setCustomValidity("")}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="field textArea">
                    <label htmlFor="plan-message" className="field-label">
                      Base plan requirement:
                    </label>
                    <textarea
                      name="plan-message"
                      id="plan-message"
                      className=""
                      value={planMessage}
                      onChange={(e) => setPlanMessage(e.target.value)}
                      placeholder="Want an enterprise solution?
                      &oline;
                      Techiemation Offers end to end custom service for businesses of all sizes. Contact us today to discover how we can help achieve your goals."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="action-btn btn-white form-submit-btn"
                >
                  Send <FiSend />
                </button>

                {isPopupVisible && (
                  <div className="popup">
                    <LuCheckCircle size={100} color={"#0062d1"} />
                    <h1>Thank You!</h1>
                    <p>Your Message was Sent Successfully!</p>
                    <p>We will Respond to your Message Promptly</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
