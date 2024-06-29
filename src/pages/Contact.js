import SectionHeading from "../components/SectionHeading";
import ActionBtn from "../components/ActionBtn";
import contactImage from "../resourses/illustration/12982910_5124556.jpg";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function Contact() {
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
          <SectionHeading shortheading={"contact"} mainHeading={"Form"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={contactImage} alt="contact" className="contact-image" />
              <form
                name="contact"
                action="https://formspree.io/f/mqazkzlj"
                method="POST"
              >
                <div className="field-container">
                  <div className="field">
                    <label htmlFor="name" className="field-label">
                      Name:
                    </label>
                    <input
                      autoComplete="name"
                      type="text"
                      name=""
                      id="name"
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
                <label htmlFor="email" className="field-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  className="input-field"
                  required
                />
                <label htmlFor="message" className="field-label">
                  Message:
                </label>
                <textarea
                  name=""
                  id="message"
                  cols="30"
                  rows="10"
                  required
                ></textarea>
                <ActionBtn type="submit" btn={"btn-white"}>
                  Send <FiSend />
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
