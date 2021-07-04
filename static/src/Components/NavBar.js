import React from "react";
import { Link, useHistory } from "react-router-dom";
import BtnAdd from "./BtnAdd";

import "../styles/navbar.scss";

const NavBar = ({ user }) => {
  const history = useHistory();
  console.log(user);
  
  return (
    <div className="nav-bar">
      <ul>
        <li className="nav-left">
          <Link to="/" className="nav-link">
            <h1>AM</h1>
          </Link>
          <Link to="/" className="nav-link" id="home">
            <i className="fas fa-home"></i>Home
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
            <BtnAdd />
            <Link onClick={() => {history.replace('/');}} className="nav-link btn">
              Sign out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
