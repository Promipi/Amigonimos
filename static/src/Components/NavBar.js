import React, { Component } from 'react'
import {A} from 'hookrouter';

import '../styles/navbar.scss'

class NavBar extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return ( 
          <div className="nav-bar">
            <ul>
              <li className="nav-link">
                <A href="/home">
                  Home   
                </A>
              </li>
              {!this.props.logged &&
                <li className="nav-link nav-right">
                  <A href="/login">
                    Log in
                  </A>
                </li> 
              } 
            </ul>
          </div>
        )
    }
}

export default NavBar;