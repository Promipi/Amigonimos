import React, { Component } from 'react'
import NavBar from './Navbar';

class Account extends Component {
    render() {
        return (
          <div>
            <NavBar logged={this.props.isLogged} />
            <h1>xd</h1>
          </div>
        )
    }
}

export default Account;