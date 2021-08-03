import React, { useContext, useEffect, useState } from 'react'
import Switch from './Switch';
import '../styles/settings.scss';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from '../Context/UserContext';

const MySwal = withReactContent(Swal);

const Settings = ({publicHelps,id,userName}) => {
    const [publicHS,setPublicHS] = useState(publicHelps);
    const {color,setColor} = useContext(UserContext);

    const updateSettings = (e) =>{
        e.preventDefault();
        axios.put(`${process.env.IDENTITY_URL}`,{
            id:id,
            publicHelps:publicHS,
            username:userName
        },{
            headers:{
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((data)=>{
            MySwal.fire({title:"Updated successfully!",icon:"success"});
        }).catch((err)=>{
            MySwal.fire({title:"Something went wrong!",icon:"error"});
        })
    }

    useEffect(()=>{
        setPublicHS(publicHelps);
    },[publicHelps]);

    return (
        <form className="form-setting" onSubmit={updateSettings}>
            <div id="settings">
                <div className="form-group">
                    <h3>Public helps</h3>
                    <Switch value={publicHS} onChange={e=>setPublicHS(!publicHS)}/>
                </div>
                <div className="form-group">
                    <h3>Card Color</h3>
                    <input type="color" value={color} onChange={e=>setColor(e.target.value)} style={{height:"80px",width:"80px",minWidth:"auto"}}/>
                </div>
            </div>
            <div className="form-group" id="btn">
                <input type="submit" className="btn" value="Save"/>
            </div>
        </form>
    )
}

export default Settings;