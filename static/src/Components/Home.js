import React,{useEffect,useState} from "react";
import NavBar from "./NavBar";
import "../styles/home.scss";
import { Link, Switch, Route} from "react-router-dom";
import Posts from "./Posts";
import Post from './Post';
import RightSide from './RightSide';

const Home = ({logged}) => {

  return (
    <div>
      <NavBar logged={logged} />
      <div className="container-main">
        <div className="container-posts">
          <Switch>
            <Route exact path="/">
              <Posts/>
            </Route>
            <Route path="/post/:id">
              <Post logged={logged}/>
            </Route>
            <Route path="/page/:page">
              <Posts/>
            </Route>
          </Switch>
        </div>
        <RightSide logged={logged}/>
      </div>
    </div>
  );
};

export default Home;
