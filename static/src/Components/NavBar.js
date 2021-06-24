import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import * as Session from '../Utils/Session';

import '../styles/navbar.scss'

class NavBar extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return ( 
          <div className="nav-bar">
            <ul>
              <li className="nav-left">
                <Link to="/" className="nav-link">
                    Home 
                </Link>
              </li>
              {!this.props.logged &&
                <li className="nav-right">
                  <Link to="/login" className="nav-link">
                    Sign in
                  </Link>
                </li>
              } 
              {this.props.logged && 
                <li className="nav-right">
                  <Link to="#!" onClick={() => Session.logout()} className="nav-link">
                    Sign out
                  </Link>
                </li>
              } 
            </ul>
          </div>
        )
    }
}

export default NavBar;