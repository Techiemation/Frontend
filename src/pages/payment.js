import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import paymentImage from "../resourses/illustration/8174445_3857457.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";

import { FiSend } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import React from "react";

export default function Payment() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [mobileNo, setMoblieNo] = useState("");
  const [planMessage, setPlanMessage] = useState("");

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  const validateForm = () => {
    const errors = {};
    if (!firstname) errors.name = "Name is Required";
    if (!company) {
      errors.company = "Company is Required";
    }
    if (!mobileNo) {
      errors.mobileNo = "Moblie Number is Required";
    } else if (!/^\d{9,}$/.test(mobileNo)) {
      errors.mobileNo = "Moblie Number should only have Numbers";
    }
    if (!planMessage) errors.message = "Plan Requirement is Required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully.");

      setFirstname("");
      setLastname("");
      setCompany("");
      setMoblieNo("");
      setPlanMessage("");

      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
    } else {
      const errorMessages = Object.values(validationErrors).join(", ");
      alert(`Validation Errors:\n${errorMessages}`);
    }
  };

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
                      <label htmlFor="firstname" className="field-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        name=""
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="lastname" className="field-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        name=""
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="input-field"
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
                        name=""
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
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
                        value={mobileNo}
                        onChange={(e) => setMoblieNo(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="field textArea">
                    <label htmlFor="plan-message" className="field-label">
                      Base plan requirement:
                    </label>
                    <textarea
                      name=""
                      id="plan-message"
                      className=""
                      value={planMessage}
                      onChange={(e) => setPlanMessage(e.target.value)}
                      placeholder="Want an enterprise solution?
                      &oline;
                      Techiemation Offers end to end custom service for businesses of all sizes. Contact us today to discover how we can help achieve your goals."
                    ></textarea>
                  </div>
                </div>

                <ActionBtn
                  icon={""}
                  btn={"btn-white"}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FiSend /> Send
                </ActionBtn>
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
