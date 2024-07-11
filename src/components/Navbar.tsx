import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
