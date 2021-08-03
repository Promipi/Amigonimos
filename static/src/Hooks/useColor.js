import {useEffect,useState} from 'react'
import * as tf from "@tensorflow/tfjs";

const useColor = () =>{
    const [color,setColor] = useState(window.localStorage.getItem("color") ? window.localStorage.getItem("color") : "#F2AA1F");
    const [colorText,setColorText] = useState(window.localStorage.getItem("text-color") ? window.localStorage.getItem("text-color") : "white")


    const getRgb = (color) =>{
        const r = parseInt(color.substr(1,2), 16) / 255
        const g = parseInt(color.substr(3,2), 16) / 255
        const b = parseInt(color.substr(5,2), 16) / 255
        return {r,g,b}
    }

    const getPredict = async(r,g,b) =>{
        const model = await tf.loadLayersModel("http://localhost:8080/model/model.json");
        const value = model.predict(tf.tensor2d([[r,g,b]])).dataSync()[0];
        setColorText(value > .5 ? "white" : "black");
    }

    useEffect(()=>{
        window.localStorage.setItem("color",color);
        const {r,g,b} = getRgb(color);
        console.log(r,g,b)
        getPredict(r,g,b);
    },[color]);

    return [color,setColor,colorText]
}

export default useColor;