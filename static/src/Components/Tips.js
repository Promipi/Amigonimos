import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Tip from './Tip';

const Tips = () =>{
    const [tips,setTips] = useState([]);

    const getAllTipsUpVote = async() =>{
        const res = await axios.get(`${process.env.LOCAL}/api/Tips/Vote?Num=5`);
        const data = res.data;
        console.log(data);
        setTips(data.Tips);
    }

    useEffect(() => {
        getAllTipsUpVote();
    },[]);

    return(
        <div className="tips">
            <div className="title">
                <h2><i className="fas fa-angle-right"></i> Most Voted Tips</h2>
            </div>
            <ul className="tips-container">
            {tips.length ? tips.map((tip,i)=>(
                <Tip tip={tip} key={i}/>
            )):
            (
                <Loader />
            )}
            </ul>
        </div>
    )
}

export default Tips;