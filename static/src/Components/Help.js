import React from 'react';
import * as timeago from 'timeago.js';
import {Link} from 'react-router-dom'

const Help = ({help}) => {
    return (
        <div className="helps">
            <div className="avatar">
                <img
                    src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                    alt="no"
                />
                <Link  to={"/profile/"+help.ownerId}><h4>{help.ownerUsername}</h4></Link>
            </div>
            <div className="helps-comentario">
                <p>{help.content}</p>
                <h4>{timeago.format(help.creationDate+"Z")}</h4>
            </div>
        </div>
    )
}

export default Help
