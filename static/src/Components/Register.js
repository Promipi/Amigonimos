import React,{useState,useContext} from 'react';
import LogoComponent from './LogoContainer';
import {Link, useLocation} from 'react-router-dom';
import '../styles/login.scss';
import queryString from 'query-string'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from '../Context/UserContext';

const MySwal = withReactContent(Swal)

const Register = () =>{
    const redirectUrl = queryString.parse(useLocation().search).redirect;
    const {user,Register} = useContext(UserContext);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    if(user) MySwal.fire("Alert","You have already logged in","info").then(()=>window.location.replace(redirectUrl ? redirectUrl : "/"))

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const cb = () => {
            setUsername("");
            setEmail("");
            setPassword("");
        }
        if(username === "") return MySwal.fire("Alert","You cant have an username empty!","info");
        if(email === "") return MySwal.fire("Alert","You cant have an email empty!","info");
        if(password === "") return MySwal.fire("Alert","You cant have an password empty!","info");
        await Register(username,email,password,redirectUrl,cb);
    }

    return(
        <div className="container">
            <LogoComponent />
            <form className="form-register" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <input type="text" placeholder="Username: " autoComplete="off" value={username} onChange={e=>setUsername(e.target.value)}/>
                    <div className="bar" />
                </div>
                <div className="form-group" id="form_group">
                    <div>
                        <input type="email" placeholder="E-mail: " autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)}/>
                        <div className="bar" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" autoComplete="off" value={password} onChange={e=>setPassword(e.target.value)}/>
                        <div className="bar" />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn form-btn" value="Create account" />
                </div>
                <div className="form-footer">
                    <Link to="/login" className="btn primary form-btn">Already have a account?</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;