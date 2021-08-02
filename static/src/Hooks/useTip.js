import axios from 'axios';
import {useEffect,useState} from 'react';

const useTip = (page,limit) =>{
    const [tips,setTips] = useState([]);
    const [loading,setLoading] = useState(false);
    const [pages,setPages] = useState(0);

    const getAllTips = async() =>{
        setLoading(true);
        const res = await axios.get(`${process.env.LOCAL}api/tips`);
        const data = res.data;
        const tips = data.tips.slice((page * limit-10),limit);
        const pages = Math.round(tips.length/limit);
        setPages(pages);
        setTips(tips);
        setLoading(false);
    }


    useEffect(() => {
        try{
            getAllTips();
        }catch(err){
            getAllTips();
        }
    },[]);

    return [tips,pages,loading];
}

export default useTip;