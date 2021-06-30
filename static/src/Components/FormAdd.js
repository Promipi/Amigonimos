import React,{useState} from 'react';
import '../styles/form-add.scss';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const FormAdd = () =>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            if(title==="") return MySwal.fire({title:"Info",text:"El titulo no puede estar vacio.",icon:"info"})
            if(content==="") return MySwal.fire({title:"Info",text:"El contenido no puede estar vacio.",icon:"info"})
    
            const response = await axios.post(`https://amigonimo-web-api.herokuapp.com/api/problems`,JSON.stringify({title:title.trim(),content:content.trim(),creationDate:new Date().toISOString()}),{headers:{
                "Content-Type":"application/json"
            }})

            setContent("");
            setTitle("");
    
            const data = response.data;
            
            MySwal.fire({
                title:"Success",
                text:"Se a agregado tu problema",
                icon:"success"
            }).then(()=>{
                window.location.replace("/");
            })
        }catch(err){
            MySwal.fire({
                title:"Error",
                text:err.message,
                icon:"error"
            })
        }
    }

    return(
        <form className="form-add" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="title" id="title" value={title} placeholder="Titulo del problema" autoComplete="off" onChange={e=>setTitle(e.target.value)} minLength="5"/> 
            </div>
            <div className="form-group">
                <textarea name="content" id="content" value={content} placeholder="Contenido" autoComplete="off" onChange={e=>setContent(e.target.value)}/> 
            </div>
            <div className="form-group">
                <input type="submit" value="Subir" className="form-btn"/>
            </div>
        </form>
    )
}

export default FormAdd;