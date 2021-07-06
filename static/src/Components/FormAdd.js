import React,{useState,useContext} from 'react';
import '../styles/form-add.scss';
import {UserContext} from '../Context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal)

const FormAdd = ({user}) =>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [isLoading,setLoading] = useState(false);
    const history = useHistory();
    const {token} = useContext(UserContext);

    if(!user) return window.location.replace("/");

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            if(title==="") return MySwal.fire({title:"Info",text:"El titulo no puede estar vacio.",icon:"info"})
            if(content==="") return MySwal.fire({title:"Info",text:"El contenido no puede estar vacio.",icon:"info"})
            setLoading(true);
            await axios.post(`https://amigonimo-web-api.herokuapp.com/api/problems`,JSON.stringify({title:title.trim(),content:content.trim(),creationDate:new Date().toISOString(),ownerId:user.nameid}),{headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }});

            setContent("");
            setTitle("");
            
            MySwal.fire({
                title:"Success",
                text:"Se a agregado tu problema",
                icon:"success"
            }).then(()=>{
                setLoading(false);
                history.replace("/");
            })
        }catch(err){
            MySwal.fire({
                title:"Error",
                text:err.message,
                icon:"error"
            })
            setLoading(false);
        }
    }

    return(
        <div style={{width:"100%",height:"100%"}}>
            <div className="title">
                <h2><i className="fas fa-angle-right"></i>Añadir un Problema</h2>
            </div>
            <div id="container">
                <form className="form-add" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="text" name="title" id="title" value={title} placeholder="Titulo del problema" autoComplete="off" onChange={e=>setTitle(e.target.value)} minLength="5"/> 
                        <div className="bar"></div>
                    </div>
                    <div className="form-group">
                        <textarea  className="form-control" name="content" id="content" value={content} placeholder="Contenido" autoComplete="off" onChange={e=>setContent(e.target.value)}/> 
                        <div className="bar"></div>
                    </div>
                    {
                        !isLoading ? (
                            <div className="form-group">
                                <input type="submit" value="Subir" className="form-btn btn"/>
                            </div>
                        ) : 
                        <i className="fas fa-spinner spin"></i>
                    }
                </form>
            </div>
        </div>
    )
}

export default FormAdd;