import React,{useContext, useState} from "react";
import "../styles/login.scss";
import {useLocation,Link, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import LogoComponent from '../Components/LogoContainer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from "../Context/UserContext";

const MySwal = withReactContent(Swal)

const Login = () => {
  const {user,Login} = useContext(UserContext);
  const redirectUrl = queryString.parse(useLocation().search).redirect
  const history = useHistory()
  const [emailOrUsername,setEmailOrUsername] = useState("");
  const [password,setPassword] = useState("");

  if (user) MySwal.fire("Alert","You have already logged in","info").then(()=>window.location.replace(redirectUrl ? redirectUrl : "/"))

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(emailOrUsername === "") return MySwal.fire("Alert","You cant have an Email or Username empty!","info");
    if(password === "") return MySwal.fire("Alert","You cant have an password empty!","info");
    await Login(emailOrUsername,password,redirectUrl,()=>{
      setEmailOrUsername("");
      setPassword("");
    });
  }


  return (
    <div className="container">
      <LogoComponent />
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input type="text" placeholder="Enter your username or email: " autoComplete="off" id="user" name="user" value={emailOrUsername} onChange={e=>setEmailOrUsername(e.target.value)}/>
          <div className="bar" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Enter your password: " autoComplete="off" id="password" name="password" value={password} onChange={e=>setPassword(e.target.value)}/>
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
