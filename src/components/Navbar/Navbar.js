import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear authentication
    setAuth(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h1>Star Wars App</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
