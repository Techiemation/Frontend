import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

import loginImage from "../resourses/img/login.jpg";
import SectionHeading from "../components/SectionHeading";
import { useState } from "react";
import ActionBtn from "../components/ActionBtn";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";

export default function LoginSignUp({ form = "Login" }) {
  console.log(form);
  const [currentForm, setInputForm] = useState(form);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  function handleChangeForm(e) {
    setInputForm(
      e.target.innerText === currentForm ? currentForm : e.target.innerText
    );
  }

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
          <SectionHeading
            shortheading={"login / sign up"}
            mainHeading={"Account"}
          />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img src={loginImage} alt="login" className="contact-image" />

              <div className="form-box">
                <div className="form-diff-btn">
                  <div
                    onClick={(e) => handleChangeForm(e)}
                    className={`form-btn ${
                      currentForm === "Login" && "active"
                    }`}
                  >
                    Login
                  </div>
                  <div
                    onClick={(e) => handleChangeForm(e)}
                    className={`form-btn ${
                      currentForm === "Sign Up" && "active"
                    }`}
                  >
                    Sign Up
                  </div>
                </div>
                {currentForm === "Login" ? <LoginForm /> : <SignUpForm />}
                <div className="form-alt">
                  <a href="">
                    <FaFacebook className="footer-icon" />
                  </a>
                  <span>OR</span>
                  <a href="">
                    <FaGoogle className="footer-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remeberUser, setRememberUser] = useState(false);

  return (
    <form className="form-login">
      <div className="field">
        <label className="field-label">Username:</label>
        <input
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="field-label">Password:</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="form-remeber-me">
          <span>
            <input
              type="checkbox"
              checked={remeberUser}
              onChange={(e) => setRememberUser(e.target.checked)}
            />
            <label> Remember Me</label>
          </span>
          <a className="forgot" href="login-signup">
            Forgot Password?
          </a>
        </span>
      </div>

      <ActionBtn btn={"btn-white form-box-button"} link="/login-signup">
        <CiLogin /> Login
      </ActionBtn>
    </form>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const profile = {
  //   username: { username },
  //   email: { email },
  //   password: { password },
  // };

  return (
    <form className="form-login">
      <div className="text-input">
        <label className="field-label">Username:</label>
        <input
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="text-input">
        <label className="field-label">Email:</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-input">
        <label className="field-label">Password:</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <ActionBtn
        icon={""}
        btn={"btn-white form-box-button"}
        link="/login-signup+"
      >
        <MdOutlinePersonAdd /> Sign Up
      </ActionBtn>
    </form>
  );
}
