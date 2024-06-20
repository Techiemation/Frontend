import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const updateProfile = () => {
    let promptFromUser = `dreams.`;
    let summaryForUser = "drm.";
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const updatedData = {
        prompt: promptFromUser,
        history: summaryForUser,
      };
      updateDoc(docRef, updatedData)
        .then(() => {
          console.log("Profile updated successfully");
          alert("Profile updated successfully");
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
          alert("Error updating profile: " + error.message);
        });
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in : " + user.uid);
        const docRef = doc(db, "users", user.uid);

        onSnapshot(docRef, (doc) => {
          // console.log("Current data: ", doc.data());
          setUserData(doc.data());
        });
      } else {
        console.log("No user is signed in");
      }
    });
  }, []);

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
      <h1>User Profile</h1>
      {userData && (
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
      )}
      <button onClick={updateProfile}>Update Profile</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserProfile;
