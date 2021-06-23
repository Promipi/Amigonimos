import React, { Component } from 'react'
import axios from 'axios'
import Session from './Utils/Session'
import Home from './Home'
import Login from './Login'

import './styles/main.scss';

const isLogged = Session.isLoggedIn();


class App extends Component {
    render() {
        return (
            <div className="main-container">
              { isLogged ? <Home/> : <Login/> }
            </div>
        )
    }
}

export default App;