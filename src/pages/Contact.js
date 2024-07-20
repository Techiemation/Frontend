import SectionHeading from "../components/SectionHeading";
import contactImage from "../resourses/illustration/12982910_5124556.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";
import { useForm } from "@formspree/react";

export default function Contact() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
    setEmail("");
    setMessage("");

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
          <SectionHeading shortheading={"contact"} mainHeading={"Form"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={contactImage} alt="contact" className="contact-image" />
              <form onSubmit={handleSubmit}>
                <div className="field-container">
                  <div className="field">
                    <label htmlFor="name" className="field-label">
                      First Name:
                    </label>
                    <input
                      autoComplete="name"
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      id="name"
                      name="name"
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
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      id="lastname"
                      name="lastname"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <label htmlFor="email" className="field-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  autoComplete="email"
                  required
                />
                <label htmlFor="message" className="field-label">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

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
