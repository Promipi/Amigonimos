import axios from 'axios'
import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../Context/UserContext'

const Tip = ({tip,post}) => {
    const {user} = useContext(UserContext);
    const [votes,setVotes] = useState(tip.votes);
    const id = user.nameid;
    const btn = useRef();
    const handleClick = async() =>{
        if(Array.from(btn.current.classList).find((el)=>el==="clicked")) return;
        btn.current.classList.add("clicked");
        const res =await axios.put(`${process.env.LOCAL}api/tips/vote/${tip.id}`,JSON.stringify({userid:id}),{headers:{"Content-Type": "application/json"}});
        const data = res.data;
        setVotes(data.tip.votes);
        setTimeout(()=>{
            btn.current.classList.remove("clicked");
        },300);
    }
    return (
        <li className={`tip ${post ? "post" : ""}`}>
            {post && <div className="post-bar"></div>}
            <div className={`title-tip ${post ? "post-title" : ""}`}>
                <h3>{tip.content}</h3>
            </div>
            <div className="likes-tip">
                <p>{votes}</p>
                <i className="fas fa-heart" onClick={handleClick} ref={btn}></i>
            </div>
        </li>
    )
}

export default Tip
