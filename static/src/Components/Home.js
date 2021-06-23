import React, { Component } from 'react'
import NavBar from './Navbar';

class Home extends Component {
    render() {
        return (
          <div>
            <NavBar logged={this.props.isLogged} />
            <h1>Home</h1>
          </div>
        )
    }
}

export default Home;