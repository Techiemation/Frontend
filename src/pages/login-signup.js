import { FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

import { useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import loginImage from "../resourses/img/login.jpg";
import SectionHeading from "../components/SectionHeading";

import ActionBtn from "../components/ActionBtn";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";

export default function LoginSignUp({ form = "Login" }) {
  const [currentForm, setInputForm] = useState(form);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const navigate = useNavigate();

  function handleChangeForm(e) {
    setInputForm(
      e.target.innerText === currentForm ? currentForm : e.target.innerText
    );
  }

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user info to Firestore
      const userDoc = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          username: user.displayName,
          email: user.email,
          paid: "No",
          prompt: "No prompt yet", // new object to save prompt message
          history: "No history yet", // new object to save summarized history
        },
        { merge: true }
      ); // merge: true to avoid overwriting existing data

      console.log("User logged in with Google:", user);
      alert("User logged in with Google");
      navigate("/prompt");
    } catch (error) {
      console.log("Error signing in with Google:", error.message);
      // alert("Error signing in with Google: " + error.message);
    }
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
                {currentForm === "Login" ? (
                  <LoginForm navigate={navigate} />
                ) : (
                  <SignUpForm navigate={navigate} />
                )}
                <div className="form-alt">
                  {/* <div>
                    <FaFacebook className="footer-icon" />
                  </div> */}
                  <span>OR</span>
                  <div>
                    <FaGoogle
                      className="footer-icon"
                      onClick={handleGoogleSignIn}
                    />
                  </div>
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

function LoginForm({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remeberUser, setRememberUser] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      alert("User logged in");
      navigate("/prompt");
    } catch (error) {
      console.log(error.message);
      alert("Error logging in: " + error.message);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.log(error.message);
      alert("Error sending password reset email: " + error.message);
    }
  }

  return (
    <form className="form-login">
      <div className="field">
        <label className="field-label">Email:</label>
        <input
          className="input-field"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <div className="forgot" onClick={handleForgotPassword}>
            Forgot Password?
          </div>
        </span>
      </div>

      <ActionBtn
        btn={"btn-white form-box-button"}
        // link="/login-signup"
        onClick={handleSubmit}
      >
        <CiLogin /> Login
      </ActionBtn>
    </form>
  );
}

function SignUpForm({ navigate }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
          paid: "No",
          prompt: "No prompt yet", // new object to save prompt message
          history: "No history yet", // new object to save summarized history
        });
      })
      .then(() => {
        alert("Account created Successfully success!");
        console.log("Account created Successfully success!");
        window.location.href = "/login-signup";
      })
      .catch((err) => {
        console.log(err.message);
        alert("Cannot Signup " + err.message);
      })
      .catch((err) => {
        console.log(err.message);
        alert("Cannot Signup " + err.message);
      });
  }

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
        // link="/login-signup+"
        onClick={handleSubmit}
      >
        <MdOutlinePersonAdd /> Sign Up
      </ActionBtn>
    </form>
  );
}
