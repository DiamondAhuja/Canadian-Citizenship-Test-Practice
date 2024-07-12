// AnonymousSignIn.tsx
import React from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const AnonymousSignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing in anonymously: ", error);
    }
  };

  return <button onClick={handleAnonymousSignIn}>Continue as Guest</button>;
};

export default AnonymousSignIn;
