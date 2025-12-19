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

    await updateProfile(userCredential.user, { displayName: name, photoURL });
    const user = userCredential.user;

    // save to mongodb
    await axios.post("http://localhost:3000/users", {
      uid: user.uid,
      name,
      email,
      photoURL,
    });
    return user;
  };

  // user login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    // update mongodb
    await axios.patch(`http://localhost:3000/users/${auth.currentUser.uid}`, {
      name,
      photoURL,
    });
    setCurrentUser({ ...currentUser, displayName: name, photoURL });
  };

  // Observe current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
