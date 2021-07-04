import React,{useEffect} from 'react';
import '../styles/loader.scss';

const Loader = () =>{
    useEffect(()=>{
        const dots = document.getElementById("dots");
        let wordWrapperContent = dots.innerHTML;
        const string = "...";
        let adding = false;
        setInterval(()=>{
            if(wordWrapperContent.length > 0 && !adding) {
                dots.innerHTML = "";
                wordWrapperContent = dots.innerHTML;
            }else{
                adding=true;
            }
            if(wordWrapperContent.length < string.length && adding){
                dots.innerHTML = string.slice(0,wordWrapperContent.length+1);
                wordWrapperContent = dots.innerHTML;
            }else{
                adding=false;
            }
        },250)
    },[])

    return(
        <div className="loader">
            <i className="fas fa-spinner spin"></i>
            <h3>Cargando<span id="dots"></span></h3>
        </div>
    )
}

export default Loader;