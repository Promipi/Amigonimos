import React,{useState,useContext} from 'react';
import LogoComponent from '../Components/LogoContainer';
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
    const [allValid,setAllValid] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [messagePassword,setMessagePassword] = useState("");
    const [messageEmail,setMessageEmail] = useState("");
    const [messageUsername,setMessageUsername] = useState("");
    const [usernameValidity,setUsernameValidity] = useState(false);
    const [emailValidity,setEmailValidity] = useState(false);
    const [passwordValidity,setPasswordValidity] = useState(false);

    if(user) MySwal.fire("Alert","You have already logged in","info").then(()=>window.location.replace(redirectUrl ? redirectUrl : "/"))

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!allValid) return;
        const cb = () => {
            setUsername("");
            setEmail("");
            setPassword("");
        }
        await Register(username,email,password,redirectUrl,cb);
    }

    const handleOnChange = (e,type,setState) =>{
        const value = e.target.value;
        setState(value)
        if(type==="password"){
            if(!/[\A-Z]/.test(value)){
                setPasswordValidity(true);
                return setMessagePassword("Password must contain a letter upper case.");
            }
            if(!/[\a-z]/.test(value)){
                setPasswordValidity(true);
                return setMessagePassword("Password must contain a letter lower case.");
            }
            if(!/[\0-9]/.test(value)){
                setPasswordValidity(true);
                return setMessagePassword("Password must contain an number.");
            }
        }
        else if(type=="username"){
            if(value=="")
                setMessageUsername("Username cannot be empty.")
                return setUsernameValidity(true) 
        }
        else if(type="email"){
            if(value==""){
                setEmailValidity(true)
                return setMessageEmail("Email cannot be empty.");
            }
            if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)){
                setEmailValidity(true);
                return setMessageEmail("Provide an email!!.")
            }
        }
        setMessageUsername("");
        setMessagePassword("");
        setMessageEmail("");
        setAllValid(true);
    }

    return(
        <div className="container">
            <LogoComponent />
            <form className="form-register" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <input type="text" placeholder="Username: " autoComplete="off" value={username} onChange={e=>handleOnChange(e,"username",setUsername)}/>
                    <div className="bar" />
                    {messageUsername !== "" && usernameValidity && (<span className="validation-message"><i class="fas fa-info-circle"></i>{messageUsername}</span>)}
                </div>
                <div className="form-group" id="form_group">
                    <div>
                        <input type="email" placeholder="E-mail: " autoComplete="off" value={email} onChange={e=>handleOnChange(e,"email",setEmail)}/>
                        <div className="bar" />
                        {messageEmail !== "" && emailValidity && (<span className="validation-message"><i class="fas fa-info-circle"></i>{messageEmail}</span>)}
                    </div>
                    <div>
                        <input type="password" placeholder="Password" autoComplete="off" value={password} onChange={e=>handleOnChange(e,"password",setPassword)}/>
                        <div className="bar" />
                        {messagePassword !== "" && passwordValidity && (<span className="validation-message"><i class="fas fa-info-circle"></i>{messagePassword}</span>)}
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