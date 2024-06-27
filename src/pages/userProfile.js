import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import userProfileImage from "../resourses/illustration/profile.jpg";
import ActionBtn from "../components/ActionBtn";

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   const updateProfile = () => {
//     let promptFromUser = `dreams.`;
//     let summaryForUser = "drm.";
//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//       const docRef = doc(db, "users", user.uid);
//       const updatedData = {
//         prompt: promptFromUser,
//         history: summaryForUser,
//       };
//       updateDoc(docRef, updatedData)
//         .then(() => {
//           console.log("Profile updated successfully");
//           alert("Profile updated successfully");
//         })
//         .catch((error) => {
//           console.log("Error updating profile:", error);
//           alert("Error updating profile: " + error.message);
//         });
//     }
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("User is signed in : " + user.uid);
//         const docRef = doc(db, "users", user.uid);

//         onSnapshot(docRef, (doc) => {
//           // console.log("Current data: ", doc.data());
//           setUserData(doc.data());
//         });
//       } else {
//         console.log("No user is signed in");
//       }
//     });
//   }, []);

//   const handleSignOut = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         console.log("User signed out");
//         navigate("/login-signup");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       {userData && (
//         <div>
//           <br />
//           <p className="user-profile">
//             <b>Username:</b> {userData.username}
//           </p>
//           <br />
//           <p className="user-profile">
//             <b>Email:</b> {userData.email}
//           </p>
//           <br />
//           <p className="user-profile">
//             <b>Subscribed:</b> {userData.paid}
//           </p>
//           <br />
//           <p className="user-profile">
//             <b>Prompt History:</b> {userData.prompt}
//           </p>
//           <br />
//           <p className="user-profile">
//             <b>Summary History:</b> {userData.history}
//           </p>
//           <br />
//         </div>
//       )}
//       <button onClick={updateProfile}>Update Profile</button>
//       <button onClick={handleSignOut}>Sign Out</button>
//     </div>
//   );
// };

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in : " + user.uid);
        const docRef = doc(db, "users", user.uid);

        onSnapshot(docRef, (doc) => {
          setUserData(doc.data());
        });
      } else {
        console.log("No user is signed in");
        navigate("/login-signup");
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/login-signup");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
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
                <form action="" className="form-login">
                  <div className="text-input">
                    <label className="field-label">Username:</label>
                    <input
                      className="input-field"
                      type="text"
                      value={userData ? userData.username : ""}
                      readOnly
                    />
                  </div>
                  <div className="text-input">
                    <label className="field-label">Email:</label>
                    <input
                      className="input-field"
                      type="text"
                      value={userData ? userData.email : ""}
                      readOnly
                    />
                  </div>
                  <div className="text-input">
                    <label className="field-label">Subscribed:</label>
                    <input
                      className="input-field"
                      type="text"
                      value={userData ? userData.paid : ""}
                      readOnly
                    />
                  </div>

                  {/* <div className="text-input">
                    <label className="field-label">History:</label>
                    <textarea
                      className="input-field history-field"
                      type="text"
                      value={userData ? userData.history : ""}
                      readOnly
                    />
                  </div> */}

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

          {/* <h1>User Profile</h1>
          {userData ? (
            <div>
              <br />
              <p className="user-profile">
                <b>Username:</b> {userData.username}
              </p>
              <br />
              <p className="user-profile">
                <b>Email:</b> {userData.email}
              </p>
              <br />
              <p className="user-profile">
                <b>Subscribed:</b> {userData.paid}
              </p>
              <br />
              <p className="user-profile">
                <b>Prompt History:</b> {userData.prompt}
              </p>
              <br />
              <p className="user-profile">
                <b>Summary History:</b> {userData.history}
              </p>
              <br />
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          <button onClick={updateProfile}>Update Profile</button>
          <button onClick={handleSignOut}>Sign Out</button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
