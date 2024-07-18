import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import contactImage from "../resourses/illustration/12982910_5124556.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { LuCheckCircle } from "react-icons/lu";

export default function Contact() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  const validateForm = () => {
    const errors = {};
    if (!firstname) errors.name = "Name is Required";
    if (!email) {
      errors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is Invalid";
    }
    if (!message) errors.message = "Message is Required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully.");

      setFirstname("");
      setLastname("");
      setEmail("");
      setMessage("");

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
          <SectionHeading shortheading={"contact"} mainHeading={"Form"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={contactImage} alt="contact" className="contact-image" />
              <form
                // onSubmit={handleSubmit}
                name="contact"
                action="https://formspree.io/f/mqazkzlj"
                method="POST"
              >
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
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <ActionBtn
                  type="submit"
                  btn={"btn-white"}
                  onClick={handleSubmit}
                >
                  Send <FiSend />
                </ActionBtn>
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
