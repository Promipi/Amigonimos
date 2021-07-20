import React,{useState,useContext} from 'react';
import '../styles/form-add.scss';
import {UserContext} from '../Context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from '../Components/Loader';
import Modal from '../Components/Modal';

const MySwal = withReactContent(Swal)

const FormAdd = () =>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [isLoading,setLoading] = useState(false);
    const {token,user} = useContext(UserContext);
    const [show,setShow] = useState(false);

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            if(title==="") return MySwal.fire({title:"Info",text:"Title cannot be empty.",icon:"info"})
            if(content==="") return MySwal.fire({title:"Info",text:"Description cannot be empty.",icon:"info"})
            setLoading(true);
            await axios.post(`https://amigonimo-web-api.herokuapp.com/api/problems`,JSON.stringify({title:title.trim(),content:content.trim(),creationDate:new Date().toISOString(),ownerId:user.nameid}),{headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }});

            setContent("");
            setTitle("");
            window.location.reload();
        }catch(err){
            MySwal.fire({
                title:"Error",
                text:err.message,
                icon:"error"
            })
            setLoading(false);
        }
    }

    const handleClose = (e) =>{
        setShow(false);
    }

    return(
        <div className="container-form">
            {
                user ? (
                    <button className="btn primary" onClick={e=>setShow(true)} style={{width:"100%"}}>Create Post</button>
                ):
                (
                    <p>To create a problem login</p>
                )
            }
            <Modal show={show} onClose={handleClose} title="Create Post">
                <form className="form-add" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="title" id="title" value={title} placeholder="Title:" autoComplete="off" onChange={e=>setTitle(e.target.value)} minLength="5"/> 
                        <div className="bar"></div>
                    </div>
                    <div className="form-group">
                        <textarea  name="content" id="content" value={content} placeholder="Description" autoComplete="off" onChange={e=>setContent(e.target.value)}/> 
                        <div className="bar"></div>
                    </div>
                    {
                        !isLoading ? (
                            <div className="form-group">
                                <input type="submit" value="ADD" className="form-btn btn"/>
                            </div>
                        ) : 
                        <Loader />
                    }
                </form>
            </Modal>
        </div>
    )
}

export default FormAdd;