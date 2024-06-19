import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

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
          console.log("Current data: ", doc.data());
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
        window.location.href = "/login-signup";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Subscribed: {userData.paid}</p>
          <p>Prompt History: {userData.prompt}</p>
          <p>Summary History: {userData.history}</p>
        </div>
      )}
      <button onClick={updateProfile}>Update Profile</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserProfile;
