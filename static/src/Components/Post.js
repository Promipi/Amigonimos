import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import * as timeago from 'timeago.js';
import Swal from 'sweetalert2'
import {UserContext} from '../Context/UserContext';
import withReactContent from 'sweetalert2-react-content'
import Loader from './Loader';

const MySwal = withReactContent(Swal)

const Post = ({ user }) => {
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [helps, setHelps] = useState([]);
  const [message,setMessage] = useState("");
  const [isLoading,setLoading] = useState(false);
  const {token} = useContext(UserContext);
  const { id } = useParams();

  const getPostById = async (id) => {
    try {
      const res = await axios.get(
        `https://amigonimo-web-api.herokuapp.com/api/Problems/${id}`
      );
      const data = res.data;
      setPost([data.content]);
      const response = await axios.get(
        `https://amigonimo-web-api.herokuapp.com/api/helps?problemId=${id}&take=100`
      );
      const helpsData = response.data;
      if(helpsData.content === null){
        setHelps(null);
      }
      setHelps(helpsData.content.items);
      setLoaded(true);
    } catch (err) {
      MySwal.fire({title:"Error",icon:"error",text:err.message});
    }
  };


  const handleSubmit = async(e) =>{
    try{
      e.preventDefault();
      if(message.trim()==="") return MySwal.fire("Alert","You cant comment with a text blank.","info");
      setLoading(true);
      const res = await axios.post("https://amigonimo-web-api.herokuapp.com/api/helps",JSON.stringify({content:message,problemId:id,creationDate:new Date().toISOString(),ownerId:user.nameid,ownerUsername:user.unique_name}),{
        headers:{
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${token}`
        },
      });
      const data = res.data;
      setMessage("");
      MySwal.fire({title:"Success",icon:"success"}).then(()=>{
        setLoading(false);
        setHelps([...helps,data.entity])
      });
    }catch(err){
      MySwal.fire({title:"Error",icon:"error",text:err.message});
    }
  }

  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <div style={{ width: "100%",height:"100%" }}>
      {!loaded && <Loader />}
      {loaded && (
        <div style={{height: "100%"}}>
          <div className="title">
            <h2>
              <i className="fas fa-angle-right"></i>
              {post[0].title}
            </h2>
          </div>
          {post.map((post,i) => (
            <div className="post help" key={i}>
              <div className="post-content">
                <div className="post-body">
                  <h4>Description:</h4>
                  <p>{post.content}</p>
                </div>
                <div className="post-date">
                  <h5>{timeago.format(post.creationDate+"Z")}</h5>
                </div>
              </div>
              <div className="post-help">
                <h3>Helps</h3>
              </div>
              <div className="helps-container">
                {helps.length ? helps.map((help, i) => (
                  <div className="helps" key={i}>
                    <div className="avatar">
                      <img
                        src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                        alt="no"
                      />
                      <Link  to={"/profile/"+help.ownerId}><h4>{help.ownerUsername}</h4></Link>
                    </div>
                    <div className="helps-comentario">
                        <p>{help.content}</p>
                        <h4>{timeago.format(help.creationDate+"Z")}</h4>
                    </div>
                  </div>
                )):
                (
                  <p id="no-help">There is no helps</p>
                )}
              </div>
              {user ? (
                <form className="comment-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Comment:"
                      id="comentario"
                      name="comentario"
                      onChange={e=>setMessage(e.target.value)}
                      autoComplete="off"
                      value={message}
                      />
                  </div>
                  {
                    !isLoading ? (
                      <button onClick={handleSubmit}>
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    ) :
                    <i className="fas fa-spinner spin"></i>
                  }
                </form>
              ) :
              (
                <form className="comment-form not-login">
                  <label>You need to be logged in to comment.!!!</label>
                  <Link to={`/login?redirect=${window.location.href}`} className="btn">LogIn</Link>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
