// Logout.tsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Handle successful logout, redirect or show a message
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
