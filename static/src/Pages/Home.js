import React,{useContext} from 'react';
import NavBar from "../Components/NavBar";
import "../styles/home.scss";
import { Switch, Route} from "react-router-dom";
import Posts from "../Components/Posts";
import Post from '../Components/Post';
import RightSide from '../Components/RightSide';
import Footer from '../Components/Footer';
import FormAdd from './FormAdd';
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
            <Route exact path="/">
              <Posts/>
            </Route>
            <Route path="/post/:id">
              <Post user={user}/>
            </Route>
            <Route path="/page/:page">
              <Posts/>
            </Route>
            <Route path="/add">
              <FormAdd user={user}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={user} />
            </Route>
            <Route exact path="/profile/:id">
              <Profile user={user}/>
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
