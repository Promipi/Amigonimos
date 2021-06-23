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
                <li className="nav-link">
                  <A href="/">
                    Home   
                  </A>
                </li>
              </li>
              {!this.props.logged &&
                <li className="nav-right">
                    <li className="nav-link">
                      <A href="/login">
                        Log in
                      </A>
                    </li>
                  </li>
              } 
            </ul>
          </div>
        )
    }
}

export default NavBar;