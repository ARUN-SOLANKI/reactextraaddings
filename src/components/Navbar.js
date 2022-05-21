import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../screens/styles/NavbarStyles.css";

import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ isLoading }) => {
  const navigate = useNavigate();
  const clearLocal = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src={require("../assets/logo.png")} className="logo" />
      <div className="Navlinks">
        <Link to="/home" className="links">
          Home
        </Link>
        <Link to="/completed" className="links">
          Completed
        </Link>
        <Link to="/incompleted" className="links">
          Incomplete
        </Link>
      </div>
      <button className="signout" onClick={clearLocal}>
        <FaSignOutAlt size="md" />
      </button>
    </div>
  );
};

export default Navbar;
