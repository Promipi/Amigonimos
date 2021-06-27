import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../styles/posts.scss";
import * as timeago from "timeago.js";

const Posts = ({ }) => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pages,setPages] = useState(null);
  const { page } = useParams();

  const getPosts = async () => {
      try{
        setLoaded(false);
        const response = await axios.get(
          `https://amigonimo-web-api.herokuapp.com/api/Problems?page=${
            page === undefined ? 1 : page
          }`
        );
        const data = response.data;
        setPosts(data.content.items);
        setPages(data.content.pages);
        setLoaded(true);
      }catch(err){
          alert(err.message)
      }
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <div style={{width:"100%"}}>
        <div className="title">
            <h2><i class="fas fa-angle-right"></i>Publicaciones</h2>
        </div>
      {!loaded && <h3>Cargando...</h3>}
      {loaded &&
        posts.map((post, id) => (
          <Link to={`/post/${post.id}`} className="post" key={id}>
            <div className="post-bar"></div>
            <div className="post-title">
              <h3 key={id}><i class="fas fa-angle-right"></i>{post.title}</h3>
              <div className="post-date">
                {timeago.format(post.creationDate)}
              </div>
            </div>
          </Link>
        ))}
        {loaded && (
            <div className="page-nav">
                {Array(pages).fill(1).map((page,id)=>(
                    <Link to={"/page/"+(id+1)} key={id} className="page-link">{id+1}</Link>
                ))}
            </div>
        )}
    </div>
  );
};

export default Posts;
