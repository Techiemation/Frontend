import { FaGoogle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

import { useEffect, useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import loginImage from "../resourses/img/login.jpg";
import SectionHeading from "../components/SectionHeading";

import ActionBtn from "../components/ActionBtn";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginSignUp({ form = "Login" }) {
  const { login } = useContext(UserContext);
  const [currentForm, setCurrentForm] = useState(form);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const navigate = useNavigate();

  function handleChangeForm(e) {
    setCurrentForm(
      e.target.innerText === currentForm ? currentForm : e.target.innerText
    );
  }

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  useEffect(() => {
    const handleAuthStateChanged = async (user) => {
      if (user) {
        try {
          const result = await getRedirectResult(auth);
          console.log(result);
          if (result) {
            const user = result.user;

            // Save user info to Firestore
            const userDoc = doc(db, "users", user.uid);
            await setDoc(
              userDoc,
              {
                username: user.displayName,
                email: user.email,
                paid: "No",
                prompt: "",
                history: "",
              },
              { merge: true }
            ); // merge: true to avoid overwriting existing data

            login(user.displayName);
            console.log("User logged in with Google:", user);
            // alert("User logged in with Google");
            navigate("/prompt");
          } else {
            // Redirect if user is already signed in but no redirect result is available
            navigate("/prompt");
          }
        } catch (error) {
          console.log("Error handling redirect result:", error.message);
          alert("Error handling redirect result: " + error.message);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, [navigate, login]);

  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   console.log(response);
  // }, []);

  async function handleGoogleSignIn() {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        login(user.displayName);

        // Save user info to Firestore
        const userDoc = doc(db, "users", user.uid);
        await setDoc(
          userDoc,
          {
            username: user.displayName,
            email: user.email,
            paid: "No",
            prompt: "", // new object to save prompt message
            history: "", // new object to save summarized history
          },
          { merge: true }
        ); // merge: true to avoid overwriting existing data

        console.log("User logged in with Google:", user);
        // alert("User logged in with Google");
        navigate("/prompt");
      }
    } catch (error) {
      console.log("Error signing in with Google:", error.message);
      // alert("Error signing in with Google: " + error.message);
    }
  }

  // async function handleGoogleSignIn() {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     // Save user info to Firestore
  //     const userDoc = doc(db, "users", user.uid);
  //     await setDoc(
  //       userDoc,
  //       {
  //         username: user.displayName,
  //         email: user.email,
  //         paid: "No",
  //         prompt: "", // new object to save prompt message
  //         history: "", // new object to save summarized history
  //       },
  //       { merge: true }
  //     ); // merge: true to avoid overwriting existing data

  //     console.log("User logged in with Google:", user);
  //     alert("User logged in with Google");
  //     navigate("/prompt");
  //   } catch (error) {
  //     console.log("Error signing in with Google:", error.message);
  //     // alert("Error signing in with Google: " + error.message);
  //   }
  // }

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
                  <LoginForm navigate={navigate} login={login} />
                ) : (
                  <SignUpForm setCurrentForm={setCurrentForm} />
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

function LoginForm({ navigate, login }) {
  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") ?? ""
  );
  const [rememberUser, setRememberUser] = useState(
    localStorage.getItem("rememberUser") === "true"
  );

  // useEffect(() => {
  //   const rememberedEmail = localStorage.getItem("email");
  //   const rememberedPassword = localStorage.getItem("password");
  //   const rememberedRememberUser =
  //     localStorage.getItem("rememberUser") === "true";

  //   console.log(rememberedEmail);
  //   console.log(rememberedPassword);
  //   console.log(localStorage.getItem("rememberUser"));
  //   console.log(rememberedRememberUser);
  // }, []);

  async function getUserData(userId) {
    const userDocRef = doc(db, "users", userId);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const data = await getUserData(user.uid);
      login(data.username);
      console.log("name is ", data.username);

      // await signInWithEmailAndPassword(auth, email, password);

      console.log("User logged in");
      if (rememberUser) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberUser", rememberUser);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberUser");
      }

      // alert("User logged in");
      navigate("/prompt");
    } catch (error) {
      console.log(error.message);
      alert("Error logging in: " + error.message);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submit action
      handleSubmit(event);
    }
  };

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
    <form className="form-login" onKeyDown={handleKeyDown}>
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
              checked={rememberUser}
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

function SignUpForm({ setCurrentForm }) {
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
          prompt: "", // new object to save prompt message
          history: "", // new object to save summarized history
        });
      })
      .then(() => {
        alert("Account created Successfully success!");
        console.log("Account created Successfully success!");
        // window.location.href = "/login-signup";
        setCurrentForm("Login");
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
