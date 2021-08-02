import React,{useContext} from 'react';
import NavBar from "../Components/NavBar";
import "../styles/home.scss";
import { Switch, Route} from "react-router-dom";
import Posts from "../Components/Posts";
import Post from '../Components/Post';
import RightSide from '../Components/RightSide';
import Footer from '../Components/Footer';
import Tips from '../Components/Tips';
import Profile from '../Components/Profile';
import {UserContext} from '../Context/UserContext'

const Home = () => {
  const {user} = useContext(UserContext);

  return (
    <div>
      <NavBar user={user} />
      <div className="container-main">
        <div className="container-posts">
          <Switch>
            <Route exact path="/" component={Posts}/>
            <Route path="/post/page/:page" component={Posts}/>
            <Route path="/post/:id">
              <Post user={user}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={user} />
            </Route>
            <Route exact path="/profile/:id">
              <Profile user={user}/>
            </Route>
            <Route exact path="/tips">
              <Tips fullHeight={true}/>
            </Route>
            <Route exact path="/tips/page/:page">
              <Tips fullHeight={true}/>
            </Route>
          </Switch>
        </div>
        <RightSide user={user}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
