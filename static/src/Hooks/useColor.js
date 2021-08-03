import {useEffect,useState} from 'react'

const useColor = () =>{
    const [color,setColor] = useState(window.localStorage.getItem("color") ? window.localStorage.getItem("color") : "#F2AA1F");

    useEffect(()=>{
        window.localStorage.setItem("color",color);
    },[color]);

    return [color,setColor]
}

export default useColor;