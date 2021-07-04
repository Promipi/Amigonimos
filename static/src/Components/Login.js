import React,{useContext} from "react";
import { useUser } from "../Hooks/useUser";
import "../styles/login.scss";
import {useLocation,Link, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import LogoComponent from './LogoContainer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from "../Context/UserContext";

const MySwal = withReactContent(Swal)

const Login = () => {
  const {Login} = useUser().funciones;
  const {user} = useContext(UserContext);
  const redirectUrl = queryString.parse(useLocation().search).redirect
  const history = useHistory()

  if (user) MySwal.fire("Alert","You have already logged in","info").then(()=>history.replace(redirectUrl ? redirectUrl : "/"))

  const handleSubmit = async(e) =>{
    e.preventDefault();
    Login();
  }

  return (
    <div className="container">
      <LogoComponent />
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input type="text" placeholder="Enter your username or email: " autoComplete="off" id="user" name="user"/>
          <div className="bar" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Enter your password: " autoComplete="off" id="password" name="password"/>
          <div className="bar" />
        </div>
        <div className="form-group">
          <input type="submit" className="btn form-btn" value="Login" />
        </div>
        <div className="form-group">
          <Link to="/recover" className="">Recover Account</Link>
        </div>
        <div className="form-footer">
          {
            redirectUrl ? (
              <Link to={`/register?redirect=${redirectUrl}`} className="btn primary form-btn">Create an account</Link>
            )
              :( 
              <Link to="/register" className="btn primary form-btn">Create an account</Link>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
