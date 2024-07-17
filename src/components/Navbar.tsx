import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { User } from "firebase/auth";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Citizenship Test
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/questions" className="nav-links">
              Questions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faqs" className="nav-links">
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-question" className="nav-links">
              Add Question
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link to="/logout" className="nav-links">
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links">
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
