import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/navbar.scss";

const NavBar = ({ user }) => {
  const history = useHistory();
  
  return (
    <div className="nav-bar">
      <ul>
        <li className="nav-left">
          <Link to="/" className="nav-link" id="home">
            <i className="fas fa-home"></i>Home
          </Link>
          <Link to="/tips" className="btn transparent nav-link">
            <i className="fas fa-bookmark"></i>Tips
          </Link>
        </li>
        {!user && (
          <li className="nav-right">
            <Link to="/login" className="nav-link btn transparent">
              Sign in
            </Link>
            <Link className="nav-link" to="/register" className="nav-link btn">
              Register
            </Link>
          </li>
        )}
        {user && (
          <li className="nav-right">
            <Link to="/profile" className="nav-link btn">
            <i className="fas fa-user-circle"></i>Profile
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
