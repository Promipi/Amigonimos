import React, { Component } from 'react'
import {A} from 'hookrouter';

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
                <A href="/" className="nav-link">
                    Home 
                </A>
              </li>
              {!this.props.logged &&
                <li className="nav-right">
                  <A href="/login" className="nav-link">
                    Sign in
                  </A>
                </li>
              } 
              {this.props.logged && 
                <li className="nav-right">
                  <A href="#!" onClick={() => Session.logout()} className="nav-link">
                    Sign out
                  </A>
                </li>
              } 
            </ul>
          </div>
        )
    }
}

export default NavBar;