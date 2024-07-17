import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Questions from "./components/Questions";
import FAQs from "./components/FAQs";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddQuestion from "./components/AddQuestion";
import UserStats from "./components/UserStats";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/user-stats" element={<UserStats />} />
        {user ? (
          <>
            <Route path="/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
