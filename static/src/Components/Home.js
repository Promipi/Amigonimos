import React, { Component } from 'react';
import NavBar from './NavBar';
import '../styles/home.scss'

class Home extends Component {
    render() {
        return (
          <div>
            <NavBar logged={this.props.isLogged} />
            <div className="container-main">
              <div className="container-posts">
                <h1>Posts</h1>
              </div>
              <div className="container-other"> 
                <h1>Ads y nose</h1>
              </div>
            </div> 
          </div>
        )
    }
}

export default Home;