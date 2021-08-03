import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';


const AvatarCard = ({id,username,onClick}) => {
    const {color} = useContext(UserContext);
    return (
        <div className="profile-avatar">
            {
                !id && (
                    <div className="profile-settings" onClick={onClick}>
                        <i class="fas fa-cog"></i>
                    </div>
                )
            }
            <div className="profile-user">
                <img src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg" alt={username}/>
                <div className="profile-username">
                    <h2>{username}</h2>
                </div>
                <span style={{backgroundColor:color}}></span>
            </div>
        </div>
    )
}

export default AvatarCard;