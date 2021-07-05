import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import * as timeago from 'timeago.js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from './Loader';

const MySwal = withReactContent(Swal)

const Post = ({ user }) => {
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [helps, setHelps] = useState(null);
  const [message,setMessage] = useState("");
  const [isLoading,setLoading] = useState(false);
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
      if(message.trim()==="") return MySwal.fire("Alert","No puedes comentar un menaje en blanco.","info");
      setLoading(true);
      const res = await axios.post("https://amigonimo-web-api.herokuapp.com/api/helps",JSON.stringify({content:message,problemId:id,creationDate:new Date().toISOString(),ownerId:"Rogelio"}),{
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = res.data;
      setMessage("");
      MySwal.fire({title:"Success",icon:"success"}).then(()=>{
        setLoading(false);
        setHelps([...helps,data.elementCreated])
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
                <h3>Ayudas</h3>
              </div>
              <div className="helps-container">
                {helps !== null ? helps.map((help, i) => (
                  <div className="helps" key={i}>
                    <div className="avatar">
                      <img
                        src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                        alt="no"
                      />
                      <h4>{help.ownerId}</h4>
                    </div>
                    <div className="helps-comentario">
                        <p>{help.content}</p>
                        <h4>{timeago.format(help.creationDate+"Z")}</h4>
                    </div>
                  </div>
                )):
                (
                  <p>No hay comentarios</p>
                )}
              </div>
              {user ? (
                <form className="comment-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Comentar"
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
                  <label>Debes iniciar sesion para ayudar!!!</label>
                  <Link to={`/login?redirect=${window.location.href}`} className="btn">Iniciar Sesion</Link>
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
