import React from "react";
import { Link } from "react-router-dom";

import * as Session from "../Utils/Session";

import "../styles/navbar.scss";

const NavBar = ({ logged }) => {
  return (
    <div className="nav-bar">
      <ul>
        <li className="nav-left">
          <Link to="/" className="nav-link">
            <i class="fas fa-home"></i>Home
          </Link>
        </li>
        {!logged && (
          <li className="nav-right">
            <Link to="/login" className="nav-link">
              <i class="fas fa-sign-in-alt"></i>Sign in
            </Link>
          </li>
        )}
        {logged && (
          <li className="nav-right">
            <Link to="#!" onClick={() => Session.logout()} className="nav-link">
              <i class="fas fa-sign-out-alt"></i>Sign out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
