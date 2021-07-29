import axios from 'axios'
import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../Context/UserContext'

const Tip = ({tip}) => {
    const {user} = useContext(UserContext);
    const [votes,setVotes] = useState(tip.Votes);
    const id = user.nameid;
    const btn = useRef();
    const handleClick = async() =>{
        if(Array.from(btn.current.classList).find((el)=>el==="clicked")) return;
        btn.current.classList.add("clicked");
        const res =await axios.put(`${process.env.LOCAL}/api/Tips/Vote/${tip.Id}`,JSON.stringify({UserId:id}),{headers:{"Content-Type": "application/json"}});
        const data = res.data;
        setVotes(data.tip.Votes);
        setTimeout(()=>{
            btn.current.classList.remove("clicked");
        },300);
    }
    return (
        <li className="tip">
                <div className="title-tip">
                    <h3>{tip.Content}</h3>
                </div>
                <div className="likes-tip">
                <p>{votes}</p>
                <i className="fas fa-heart" onClick={handleClick} ref={btn}></i>
            </div>
        </li>
    )
}

export default Tip
