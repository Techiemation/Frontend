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
              <form action="" className="payment">
                <span className="payment-container">
                  <div className="payment-box">
                    <label className="payment-desc">
                      <p className="payment-heading">Basic Monthly</p>
                      <p className="payment-price">Rs.200/month</p>
                    </label>
                    <input type="radio" name="subscription-plan" id="basic" />
                  </div>
                  <div className="payment-box">
                    <label className="payment-desc">
                      <p className="payment-heading">Premium Monthly</p>
                      <p className="payment-price">Rs.999/month</p>
                    </label>
                    <input type="radio" name="subscription-plan" id="premium" />
                  </div>
                </span>

                <label className="field-label-head">Payment Method:</label>
                <div className="method">
                  <span>
                    <label>💵 PayPal </label>
                    <input type="radio" name="payment-method" id="paypal" />
                  </span>
                  <span>
                    <label>💳 Credit Card </label>
                    <input type="radio" name="payment-method" id="card" />
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
                    <p>Rs.999</p>
                  </span>

                  <span>
                    <p>Billed Amount</p>
                    <p>Rs.1000</p>
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
