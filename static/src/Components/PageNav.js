import React from 'react';
import {Link} from 'react-router-dom'

const PageNav = ({pages,to}) => {
    return (
        <div className="page-nav">
        {Array(pages).fill(1).map((page,id)=>(
            <Link to={"/"+to+"/page/"+(id+1)} key={id} className="page-link">{id+1}</Link>
        ))}
        </div>
    )
}

export default PageNav
