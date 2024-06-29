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
    // initializeAuth();

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

  // async function handleGoogleSignIn() {
  //   try {
  //     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  //     let result;

  //     if (!isMobile) {
  //       // For mobile, always use redirect
  //       await signInWithRedirect(auth, googleProvider);
  //       // Get the result after redirect
  //       result = await getRedirectResult(auth);
  //     } else {
  //       // For desktop, use popup
  //       result = await signInWithPopup(auth, googleProvider);
  //     }

  //     if (!result) {
  //       console.log("No result from sign-in, user might have cancelled");
  //       return;
  //     }

  //     const user = result.user;
  //     login(user.displayName);

  //     // Check if user already exists in Firestore
  //     const userDoc = doc(db, "users", user.uid);
  //     const userSnapshot = await getDoc(userDoc);

  //     if (userSnapshot.exists()) {
  //       // User exists, only update necessary fields
  //       await setDoc(
  //         userDoc,
  //         {
  //           lastLogin: new Date(),
  //         },
  //         { merge: true }
  //       );
  //     } else {
  //       // New user, create full profile
  //       await setDoc(userDoc, {
  //         username: user.displayName,
  //         email: user.email,
  //         paid: "No",
  //         prompt: "",
  //         history: "",
  //         createdAt: new Date(),
  //         lastLogin: new Date(),
  //       });
  //     }

  //     console.log("User logged in with Google:", user);
  //     navigate("/prompt");
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error);
  //     // Handle specific error cases if needed
  //   }
  // }

  function handleGoogleSignIn() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // For mobile, use redirect
      signInWithRedirect(auth, googleProvider).catch((error) => {
        console.error("Error initiating Google Sign-In redirect:", error);
      });
    } else {
      // For desktop, use popup
      signInWithPopup(auth, googleProvider)
        .then((result) => handleSignInResult(result.user))
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    }
  }

  // This function should be called when your app initializes
  // function initializeAuth() {
  //   // Check for redirect result
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result && result.user) {
  //         handleSignInResult(result.user);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error getting redirect result:", error);
  //     });

  //   // Listen for auth state changes
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       handleSignInResult(user);
  //     }
  //   });
  // }

  async function handleSignInResult(user) {
    try {
      login(user.displayName);

      // Check if user already exists in Firestore
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        // User exists, only update necessary fields
        await setDoc(
          userDoc,
          {
            lastLogin: new Date(),
          },
          { merge: true }
        );
      } else {
        // New user, create full profile
        await setDoc(userDoc, {
          username: user.displayName,
          email: user.email,
          paid: "No",
          prompt: "",
          history: "",
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      }

      // console.log("User logged in with Google");
      navigate("/prompt");
    } catch (error) {
      console.error("Error handling sign-in result:", error);
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
                  <LoginForm navigate={navigate} login={login} />
                ) : (
                  <SignUpForm setCurrentForm={setCurrentForm} login={login} />
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
    <form name="login" className="form-login" onKeyDown={handleKeyDown}>
      <div className="field">
        <label htmlFor="email" className="field-label">
          Email:
        </label>
        <input
          autoComplete="email"
          id="email"
          className="input-field"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="password" className="field-label">
          Password:
        </label>
        <input
          id="password"
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="form-remeber-me">
          <span>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberUser}
              onChange={(e) => setRememberUser(e.target.checked)}
            />
            <label htmlFor="remember-me"> Remember Me</label>
          </span>
          <div className="forgot" onClick={handleForgotPassword}>
            Forgot Password?
          </div>
        </span>
      </div>

      <ActionBtn btn={"btn-white form-box-button"} onClick={handleSubmit}>
        <CiLogin /> Login
      </ActionBtn>
    </form>
  );
}

function SignUpForm({ setCurrentForm, login }) {
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
        login(username);
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form name="signup" className="form-login" onKeyDown={handleKeyDown}>
      <div className="text-input">
        <label htmlFor="username" className="field-label">
          Username:
        </label>
        <input
          id="username"
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="text-input">
        <label htmlFor="signup-email" className="field-label">
          Email:
        </label>
        <input
          id="signup-email"
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-input">
        <label htmlFor="signup-password" className="field-label">
          Password:
        </label>
        <input
          id="signup-password"
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
        onClick={handleSubmit}
      >
        <MdOutlinePersonAdd /> Sign Up
      </ActionBtn>
    </form>
  );
}
