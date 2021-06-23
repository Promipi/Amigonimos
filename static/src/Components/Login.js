import React, { Component } from 'react'
import '../styles/login.scss'

class Login extends Component {
    render() {
        if(this.props.logged) window.location.href="./";
        return (
          <div className="main-container">
            <div className="container">
              <div className="container-left shadow">
                <form>
                  <h1>Sign In</h1>
                  <div className="elements">
                    <input type="email" placeholder="Email"/>
                    <div className="bar">
                    </div>
                  </div>
                  <div className="elements">
                    <input type="password" placeholder="Password"/>
                    <div className="bar">
                    </div>
                  </div>
                  <div className="elements">
                    <input type="submit" className="form-btn"/>
                  </div>
                </form>
              </div>
              <div className="container-right shadow">
              </div>
            </div>
          </div>
        )
    }
}

export default Login;