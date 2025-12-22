import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.inite";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User + Save to MongoDB

  const registerUser = async (name, email, password, photoURL = "") => {
    setLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, { displayName: name, photoURL });
    const user = userCredential.user;

    // Save user in MongoDB
    await axios.post("https://workers-details-server.vercel.app/users", {
      uid: user.uid,
      name,
      email,
      photoURL,
    });

    // GET JWT FROM BACKEND
    try {
      const res = await axios.post(
        "https://workers-details-server.vercel.app/jwt",
        {
          uid: user.uid,
        }
      );
      localStorage.setItem("access-token", res.data.token);
    } catch (err) {
      console.error("JWT fetch failed", err);
    }

    setCurrentUser(user);
    setLoading(false);
    return user;
  };

  // user login
  const login = async (email, password) => {
    setLoading(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get JWT after login
    try {
      const res = await axios.post(
        "https://workers-details-server.vercel.app/jwt",
        {
          uid: user.uid,
        }
      );
      localStorage.setItem("access-token", res.data.token);
    } catch (err) {
      console.error("JWT fetch failed", err);
    }

    setCurrentUser(user);
    setLoading(false);
    return user;
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("access-token"); // remove JWT on logout
    setCurrentUser(null);
    setLoading(false);
  };

  // update profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: name, photoURL });

    const token = localStorage.getItem("access-token");
    if (!token) throw new Error("No access token found");

    // Update in MongoDB
    await axios.patch(
      `https://workers-details-server.vercel.app/users/${auth.currentUser.uid}`,
      { name, photoURL },
      { headers: { Authorization: `Bearer ${token}` } } // send token
    );

    // Update local state
    setCurrentUser({ ...currentUser, displayName: name, photoURL });
  };

  // Observe current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Ensure JWT exists
        const token = localStorage.getItem("access-token");
        if (!token) {
          try {
            const res = await axios.post(
              "https://workers-details-server.vercel.app/jwt",
              {
                uid: user.uid,
              }
            );
            localStorage.setItem("access-token", res.data.token);
          } catch (err) {
            console.error("JWT fetch failed", err);
          }
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    loading,
    registerUser,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
