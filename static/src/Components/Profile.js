import React,{useContext} from 'react'
import '../styles/profile.scss';
import {Link} from 'react-router-dom'
import {UserContext} from '../Context/UserContext'

const Profile = ({user}) =>{
    const {LogOut} = useContext(UserContext);

    const getHelpsById = (id) =>{

    }
    
    return(
        <div className="profile-container">
            <div className="title">
                <h2><i className="fas fa-angle-right"></i>Profile</h2>
            </div>
            <div className="profile">
                <div className="logOut">
                    <Link class="btn" onClick={()=>LogOut()}>LogOut</Link>
                </div>
                <div className="profile-data">
                    <div className="avatar">
                        <img
                            src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                            alt="no"
                        />
                    </div>
                    <div>
                        <h2>{user.unique_name}</h2>
                    </div>
                </div>

                <div className="profile-helps">
                    <div className="title">
                        <h2><i className="fas fa-angle-right"></i>Helps</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;