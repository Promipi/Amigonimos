import {useEffect,useState} from 'react'
import * as tf from "@tensorflow/tfjs";

const useColor = () =>{
    const [color,setColor] = useState(window.localStorage.getItem("color") ? window.localStorage.getItem("color") : "#F2AA1F");
    const [colorText,setColorText] = useState(window.localStorage.getItem("text-color") ? window.localStorage.getItem("text-color") : "white")

    const getModel = async() =>{
        try{
            const modelo = await tf.loadLayersModel("localstorage://model-color");
            return modelo;
        }catch(err){
            const input = tf.tensor2d([[1,1,1],[0,0,0],[0,1,0],[1,1,0]])
            const output = tf.tensor2d([[0],[1],[0],[0]])
        
            const layer = tf.layers.dense({units:8,inputShape:[3]});
        
            const model = tf.sequential({layers:[layer]});
        
        
            model.compile({
            optimizer:tf.train.adam(.1),
            metrics:["accuracy"],
            loss:"meanSquaredError"
            })
        
            model.fit(input, output,{epochs:1000}).then(()=>{
                model.predict(tf.tensor2d([[1,1,1]])).print()
            })
            await model.save("localstorage://model-color");
            return model;
        }
    }

    const getRgb = (color) =>{
        const r = parseInt(color.substr(1,2), 16) / 255
        const g = parseInt(color.substr(3,2), 16) / 255
        const b = parseInt(color.substr(5,2), 16) / 255
        return {r,g,b}
      }

    useEffect(()=>{
        window.localStorage.setItem("color",color);
        const {r,g,b} = getRgb(color);
        (async()=>{
            const model = await getModel();
            const value = model.predict(tf.tensor2d([[r,g,b]])).dataSync()[0];
            console.log(value)
            setColorText(value < .5 ? "white" : "black")
        })()
    },[color]);

    return [color,setColor,colorText]
}

export default useColor;