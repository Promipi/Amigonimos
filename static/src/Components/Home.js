import React,{useEffect,useState} from 'react';
import NavBar from "./NavBar";
import "../styles/home.scss";
import { Link, Switch, Route} from "react-router-dom";
import Posts from "./Posts";
import Post from './Post';
import RightSide from './RightSide';
import Footer from './Footer';
import BtnAdd from './BtnAdd';
import Modal from './Modal';
import FormAdd from './FormAdd';

const Home = ({logged}) => {
  const [show,setShow] = useState(false);

  const handleClick = () =>{
    setShow(true);
  }

  const handleClose = () =>{
    setShow(false);
  }

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
            <Route path="/add">
              <FormAdd />
            </Route>
          </Switch>
          <BtnAdd onClick={handleClick}/>
        </div>
        <RightSide logged={logged}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
