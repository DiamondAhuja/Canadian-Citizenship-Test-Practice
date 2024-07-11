// AnonymousSignIn.tsx
import React from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const AnonymousSignIn: React.FC = () => {
  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in anonymously: ", error);
    }
  };

  return (
    <button onClick={handleAnonymousSignIn}>
      Continue as Guest
    </button>
  );
};

export default AnonymousSignIn;
