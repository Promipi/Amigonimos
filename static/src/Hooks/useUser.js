import axios from 'axios';
import {useEffect,useState} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const useUser = () =>{
    const [user,setUser] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const [token,setToken] = useState(window.localStorage.getItem("token"));

    const Login = async(user,password,redirectUrl="/") =>{
        try{
            let objSend = {};
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            if(emailRegex.test(user))
                objSend = JSON.stringify({email:user.trim(),password:password});
            else
                objSend = JSON.stringify({username:user,password:password});
            MySwal.fire({title:"Login Success",text:"Logged in successfully",icon:"success"}).then(()=>window.location.replace(redirectUrl))
        }catch(err){
            MySwal.fire({title:"Login failed",text:err.message,icon:"error"});
        }
    }

    const LogOut = async () =>{
        setUser(null);
    }

    const Register = async(username,email,password,redirectUrl="/") => {
        try{
            const response = await axios.post("https://amigonimo-web-api.herokuapp.com/api/users/signup",JSON.stringify({email: email,password: password,username: username,publicProblems:false,publicHelps:true,publicTips:true}),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = response.data;
            window.localStorage.setItem("token",data.content.token);
            setToken(data.content.token);
            window.localStorage.getItem("expiration",data.content.expiration);
            MySwal.fire({title:"Register successfully",icon:"success"}).then(()=>window.location.replace(redirectUrl))
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

    return [user,isLoading,Login,LogOut,Register]
}