import React, { useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import userProfileImage from "../resourses/illustration/profile.jpg";
import ActionBtn from "../components/ActionBtn";
import { UserContext } from "../UserContext";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { user, logout } = useContext(UserContext);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const navigate = useNavigate();

  function handleMobileNavbar() {
    setMobileNavbar(!mobileNavbar);
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        onSnapshot(docRef, (doc) => {
          setUserData(doc.data());
        });
      } else {
        console.warn("No user is signed in");
        navigate("/login-signup");
      }
    });
  }, [navigate, user]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        logout();
        navigate("/login-signup");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleForgotPassword() {
    const email = userData.email;
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
    <div>
      <MobileNavbar
        mobileNavbar={mobileNavbar}
        onMobileNavbar={handleMobileNavbar}
      />
      <NavBar onMobileNavbar={handleMobileNavbar} />
      <div className="contact">
        <div className="container">
          <SectionHeading shortheading={"user"} mainHeading={"Profile"} />
          <div className="contact-container">
            <div className="contact-2-grid">
              <img
                src={userProfileImage}
                alt="user profile"
                className="contact-image"
              />
              <div>
                <form name="user-profile" action="" className="form-login">
                  <div className="text-input">
                    <label htmlFor="user-username" className="field-label">
                      Username:
                    </label>
                    <input
                      id="user-username"
                      className="input-field"
                      type="text"
                      value={userData ? userData.username : ""}
                      readOnly
                    />
                  </div>
                  <div className="text-input">
                    <label htmlFor="user-email" className="field-label">
                      Email:
                    </label>
                    <input
                      id="user-email"
                      className="input-field"
                      type="text"
                      value={userData ? userData.email : ""}
                      readOnly
                    />
                  </div>

                  <div className="text-input">
                    <ActionBtn
                      icon={""}
                      btn={"btn-white"}
                      onClick={handleForgotPassword}
                    >
                      Change Password
                    </ActionBtn>
                  </div>
                  <div className="text-input">
                    <ActionBtn icon={""} btn={"btn-white"} link={"/prompt"}>
                      Prompt Page
                    </ActionBtn>
                  </div>
                  <div className="text-input">
                    <ActionBtn
                      icon={""}
                      btn={"btn-white"}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </ActionBtn>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
