import React from 'react';
import '../styles/footer.scss';
import {Link} from 'react-router-dom';

const Footer = ({id}) =>{
    return(
        <div className="footer" id={id}> 
            <ul className="nav-bar">
                <li className="nav-left">
                    <Link className="nav-link"><h1>AM</h1></Link>
                </li>
                <li className="nav-right">
                    <div className="nav-grid">
                        <Link className="nav-link" to="/">Inicio</Link>
                        <Link className="nav-link" to="/login">Sign In</Link>
                        <Link className="nav-link" to="/politics">Politicas de privacidad</Link>
                        <Link className="nav-link" to="/terms">Terminos de uso</Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Footer;