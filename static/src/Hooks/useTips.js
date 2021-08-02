import { useState,useEffect } from "react";
import axios from 'axios';

const useTips = () =>{
    const [mostVotedTips, setMostVoted] = useState([]);
    const [randomTips,setRandomTips] = useState([]);

    const getRandomTips = async() =>{
        const res = await axios.get(`${process.env.LOCAL}/api/tips/random?num=5`);
        const data = res.data;
        setRandomTips(data.tips);
    }

    const getMostVotedTips = async() =>{
        const res = await axios.get(`${process.env.LOCAL}/api/tips/vote?num=5`);
        const data = res.data;
        setMostVoted(data.tips);
    }

    const getAll = async() =>{
        try{
            await getMostVotedTips();
        }catch(err){
            await getMostVotedTips();
        }
        try{
            await getRandomTips();
        }catch(err){
            await getRandomTips();
        }
    }

    useEffect(()=>{
        try{
            getAll();
        }catch(err){
            getAll();
        }
    },[]);

    return [mostVotedTips,randomTips]
}

export default useTips;