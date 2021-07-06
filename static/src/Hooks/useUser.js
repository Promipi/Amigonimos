import axios from 'axios';
import {useEffect,useState} from 'react';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)


export const useUser = () =>{
    const [user,setUser] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const [token,setToken] = useState(window.localStorage.getItem("token"));
    const [expiration,setExpiration] = useState(window.localStorage.getItem("expiration"));

    const Login = async(user,password,redirectUrl="/",cb) =>{
        try{
            let objSend = {};
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            if(emailRegex.test(user.trim())){
                user = user.trim();
                objSend = JSON.stringify({email:user.trim(),password:password,username:""});
            }
            else{
                objSend = JSON.stringify({username:user,password:password,email:""});
                return MySwal.fire({title:"Login Failed",text:"Only login by email per moment",icon:"info"})
            }
            const res = await axios.post("https://identity-web-service.herokuapp.com/api/Users/login",objSend,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = res.data;
            window.localStorage.setItem("token",data.content.token);
            setToken(data.content.token);
            window.localStorage.setItem("expiration",data.content.expiration);
            setExpiration(data.content.expiration)
            cb();
            MySwal.fire({title:"Login Success",text:"Logged in successfully",icon:"success"}).then(()=>window.location.replace(redirectUrl))
        }catch(err){
            MySwal.fire({title:"Login failed",text:err.message,icon:"error"});
        }
    }

    const LogOut = async () =>{
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("expiration");
        setUser(null);
        setToken(null);
        setExpiration(null);
        window.location.replace("/");
    }

    const Register = async(username,email,password,redirectUrl="/",cb) => {
        try{
            if(!/[A-Z]/.test(password)){
                throw new Error("Passwords must have at least one uppercase ('A'-'Z')");
            }
            if(!/[a-z]/.test(password)){
                throw new Error("Passwords must have at least one lowercase ('a'-'z')");
            }
            if(!/[0-9]/.test(password)){
                throw new Error("Passwords must have at least one number ('0'-'9')");
            }
            const response = await axios.post("https://identity-web-service.herokuapp.com/api/Users/SignUp",JSON.stringify({email: email,password: password,username: username,publicProblems:false,publicHelps:true,publicTips:true}),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            cb();
            const data = response.data;
            if(data.success){
                window.localStorage.setItem("token",data.content.token);
                setToken(data.content.token);
                window.localStorage.setItem("expiration",data.content.expiration);
                setExpiration(data.content.expiration)
                return MySwal.fire({title:"Register successfully",icon:"success"}).then(()=>window.location.replace(redirectUrl))
            }
            return MySwal.fire({title:"Register failed",icon:"error",text:data.message});
        }catch(err){
            MySwal.fire({title:"Register failed",text:err.message,icon:"error"})
        }
    }

    useEffect(()=>{
        const getCurrentUser= async() =>{
                setUser(jwt_decode(token,"DASDASDPANIAUDAPADNADADASDOSDAUNUNOOUNDOUNASOUNDSAUNODUNO"));
        }
        getCurrentUser();
    },[token]);

    return [user,token,isLoading,Login,LogOut,Register]
}