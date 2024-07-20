import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { User } from "firebase/auth";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Canadian Citizenship Test Practice
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/questions"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Questions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faqs" className="nav-links" onClick={closeMobileMenu}>
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-question"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Add Question
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/user-stats"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              User Stats
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
