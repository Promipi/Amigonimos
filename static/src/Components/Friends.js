import React from 'react';
import '../styles/friends.scss';

const Friends = () =>{
    return(
        <div className="friends-container">
            <div className="title">
                <h2><i className="fas fa-user-friends"></i>Amigos</h2>
            </div>
            <div className="friend">
                <div className="avatar">
                    <img src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg" alt="no" />
                </div>
                <div className="username">
                    <h3>Usuario 1</h3>
                </div>
            </div>
        </div>
    )
}

export default Friends;