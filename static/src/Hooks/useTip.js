import { useState,useEffect } from "react";
import axios from 'axios';

const useTip = () =>{
    const [mostVotedTips, setMostVoted] = useState([]);
    const [randomTips,setRandomTips] = useState([]);

    const getRandomTips = async() =>{
        const res = await axios.get(`${process.env.LOCAL}/api/Tips/Random?Num=5`);
        const data = res.data;
        setRandomTips(data.tips);
    }

    const getMostVotedTips = async() =>{
        const res = await axios.get(`${process.env.LOCAL}/api/Tips/Vote?Num=5`);
        const data = res.data;
        setMostVoted(data.tips);
    }

    const getAll = async() =>{
        await getMostVotedTips();
        await getRandomTips();
    }

    useEffect(()=>{
        getAll();
    },[]);

    return [mostVotedTips,randomTips]
}

export default useTip;