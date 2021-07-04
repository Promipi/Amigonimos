import React from 'react';
import '../styles/btn-add.scss';
import {Link} from 'react-router-dom';

const BtnAdd = () =>{
    return(
        <Link to="/add" className="btn-add btn transparent nav-link">
            Add Post
        </Link>
    )
}

export default BtnAdd;