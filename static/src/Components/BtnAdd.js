import React,{useState} from 'react';
import '../styles/btn-add.scss';
import {Link} from 'react-router-dom';

const BtnAdd = ({onClick}) =>{
    return(
        <Link to="/add" className="btn-add" onClick={onClick}>
            <i className="fas fa-plus"></i>
        </Link>
    )
}

export default BtnAdd;