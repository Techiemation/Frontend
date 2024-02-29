import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import paymentImage from "../resourses/illustration/8174445_3857457.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";

import { RiPaypalLine } from "react-icons/ri";
import { BsCreditCard } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Payment({ plan_ = "Basic" }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [price, setPrice] = useState(plan_ === "Basic" ? 200 : 999);

  const location = useLocation();

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when location changes
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
          <SectionHeading shortheading={"payment"} mainHeading={"Details"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={paymentImage} alt="payment" className="contact-image" />

              <form action="" className="payment">
                <span className="payment-container">
                  <div className="payment-box">
                    <label className="payment-desc">
                      <p className="payment-heading">Basic Monthly</p>
                      <p className="payment-price">Rs.200/month</p>
                    </label>
                    <input
                      type="radio"
                      name="subscription-plan"
                      id="basic"
                      value={200}
                      onChange={(e) => setPrice(e.target.value)}
                      defaultChecked={plan_ === "Basic"}
                    />
                  </div>
                  <div className="payment-box">
                    <label className="payment-desc">
                      <p className="payment-heading">Premium Monthly</p>
                      <p className="payment-price">Rs.999/month</p>
                    </label>
                    <input
                      type="radio"
                      name="subscription-plan"
                      id="premium"
                      value={999}
                      onChange={(e) => setPrice(e.target.value)}
                      defaultChecked={plan_ === "Premium"}
                    />
                  </div>
                </span>

                <label className="field-label-head">Payment Method:</label>
                <div className="method">
                  <span>
                    <label>
                      <BsCreditCard className="payment-icon" /> Credit Card{" "}
                    </label>
                    <input
                      type="radio"
                      name="payment-method"
                      id="card"
                      defaultChecked
                    />
                  </span>
                  <span>
                    <label>
                      <RiPaypalLine className="payment-icon" /> PayPal{" "}
                    </label>
                    <input type="radio" name="payment-method" id="paypal" />
                  </span>
                </div>
                <div className="input-container">
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="" className="field-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="input-field"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="" className="field-label">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field">
                      <label htmlFor="" className="field-label">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="input-field"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="" className="field-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="bill">
                  <span>
                    <p>Sub Total</p>
                    <p>Rs.{price}</p>
                  </span>

                  <span>
                    <p>Billed Amount</p>
                    <p>Rs.{price}</p>
                  </span>
                </div>
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
