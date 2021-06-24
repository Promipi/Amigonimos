import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Posts = ({setTotalPages}) =>{
    const [posts,setPosts] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const {page} = useParams();

    const getPosts = async() =>{
        setLoaded(false);
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://problem-api.herokuapp.com/api/problems?page=${page === undefined ? 1 : page}`);
        const data = response.data;
        setLoaded(true);
        setPosts(data.items);
        setTotalPages(data.pages);
    }

    useEffect(()=>{
        getPosts();
    },[page]);

    return(
        <div>
            {
                !loaded && (
                    <h3>Cargando...</h3>
                )
            }
            {
                loaded &&
                posts.map((post,id)=>(
                    <div className="post" key={id}>
                        <div className="post-title">
                            <h3 key={id}>{post.title}</h3>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts;