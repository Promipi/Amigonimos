import React,{useState,useContext} from 'react';
import LogoComponent from './LogoContainer';
import {Link, useHistory,useLocation} from 'react-router-dom';
import '../styles/login.scss';
import {useUser} from '../Hooks/useUser';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from '../Context/UserContext';

const MySwal = withReactContent(Swal)

const Register = () =>{

    const {Register} = useUser().funciones;
    const redirectUrl = queryString.parse(useLocation().search).redirect
    const history = useHistory()
    const {user} = useContext(UserContext);

    if(user) MySwal.fire("Alert","You have already logged in","info").then(()=>history.replace(redirectUrl ? redirectUrl : "/"))

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await Register()
    }

    return(
        <div className="container">
            <LogoComponent />
            <form className="form-register" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username: " autoComplete="off"/>
                    <div className="bar" />
                </div>
                <div className="form-group" id="form_group">
                    <div>
                        <input type="email" className="form-control" placeholder="E-mail: " autoComplete="off"/>
                        <div className="bar" />
                    </div>
                    <div>
                        <input type="password" className="form-control" placeholder="Password" autoComplete="off" />
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