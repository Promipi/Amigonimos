import React,{useEffect,useState} from "react";
import NavBar from "./NavBar";
import "../styles/home.scss";
import { Link, Switch, Route} from "react-router-dom";
import Posts from "./Posts";

const Home = ({logged}) => {
  const [pages,setPages] = useState(0);

  useEffect(()=>{
    console.log(pages);
  });

  return (
    <div>
      <NavBar logged={logged} />
      <div className="container-main">
        <div className="container-posts">
          <h1>Posts</h1>
          <Switch>
            <Route exact path="/">
              <Posts setTotalPages={setPages} />
            </Route>
            <Route path="/page/:page">
              <Posts setTotalPages={setPages}/>
            </Route>
          </Switch>
        </div>
        <div className="container-other">
          <h1>Ads y nose</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
