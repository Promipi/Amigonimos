import axios from 'axios';
import {useEffect,useState} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal)


export const useUser = () =>{
    const [user,setUser] = useState(true);
    const [isLoading,setLoading] = useState(false);
    const [token,setToken] = useState(window.localStorage.getItem("token"));
    const history = useHistory();

    const Login = async(user,password,redirectUrl="/") =>{
        try{
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            history.replace(redirectUrl);
        }catch(err){
            MySwal.fire({title:"Login failed",text:err.message,icon:"error"});
        }
    }

    const LogOut = async () =>{
        setUser(null);
    }

    const Register = async(username,email,password,redirectUrl="/") => {
        try{
            MySwal.fire({title:"Register successfully",icon:"success"}).then(()=>history.replace(redirectUrl))
        }catch(err){
            MySwal.fire({title:"Register failed",text:err.message,icon:"error"})
        }
    }

    useEffect(()=>{
        const getCurrentUser= async() =>{
            console.log(token);
        }
        getCurrentUser();
    },[token]);

    return {funciones:{Login,LogOut,Register},usuario:[user,isLoading]}
}