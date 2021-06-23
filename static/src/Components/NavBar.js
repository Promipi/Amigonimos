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
              <li className="nav-left">
                <A className="nav-link" href="/">
                    Home 
                </A>
              </li>
              {!this.props.logged &&
                <li className="nav-right">
                  <A href="/login" className="nav-link">
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