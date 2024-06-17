import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const updateProfile = () => {
    let promptFromUser = `In a world where dreams are not just solitary experiences but a shared tapestry of collective consciousness, a group of close-knit friends stumbles upon a remarkable discovery. By synchronizing their thoughts and emotions, they learn to manipulate their shared dreamscape, transforming it into a dynamic realm where they can address and solve real-world problems.

The dream world is a vivid, ever-changing landscape, filled with surreal beauty and boundless possibilities. Mountains made of crystal shimmer under twin suns, while forests of luminescent trees whisper secrets in the night. The friends, guided by their combined creativity, navigate this fantastical realm, crafting intricate solutions to challenges that seem insurmountable in the waking world.

As they delve deeper into their shared dreams, the boundaries between their subconscious minds blur, revealing hidden truths and unspoken fears. Long-buried memories resurface, and suppressed emotions come to light, forcing each of them to confront aspects of themselves and their relationships that they had kept hidden, even from each other. The shared dream world becomes a mirror, reflecting their innermost thoughts and desires with startling clarity.

Yet, this wondrous ability comes with unforeseen dangers. The deeper they venture, the more perilous their dreamscape becomes. Nightmarish creatures, born from their collective fears, stalk them through the dream world. They must also grapple with ethical dilemmas, as the power to alter dreams raises questions about consent and the integrity of their reality. What begins as an innocent exploration of shared consciousness quickly evolves into a high-stakes journey, where the line between dreams and reality becomes increasingly tenuous.

As they navigate this dream-woven path, they learn that the key to harnessing the power of their collective imagination lies in balance. They must find a way to integrate the insights gained from their dream experiences into their waking lives, using their newfound understanding to enrich their reality rather than escape from it. Their journey underscores the profound impact of shared imagination and the importance of facing real-life challenges head-on, even as they explore the limitless horizons of their dreams.`;

    let summaryForUser =
      "In a world where people can share and experience dreams collectively, a group of friends discovers a way to manipulate these dreams to solve real-world problems. As they delve deeper into this shared dream world, they uncover hidden truths about themselves and their relationships. However, they also face unforeseen dangers and ethical dilemmas, forcing them to confront the boundaries between dreams and reality. Their journey highlights the power of collective imagination and the importance of maintaining a balance between escapism and facing real-life challenges.";
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
