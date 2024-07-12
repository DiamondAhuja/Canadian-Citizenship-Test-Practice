// Logout.tsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom"; 

const Logout: React.FC = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
