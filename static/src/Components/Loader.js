import React,{useEffect} from 'react';
import '../styles/loader.scss';
import {CircularProgress} from '@material-ui/core'

const Loader = () =>{
    return(
        <div className="loader">
            <CircularProgress style={{color:"#F2AA1F"}}/>
        </div>
    )
}

export default Loader;