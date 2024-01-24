import { useEffect,useState } from "react";
import axios from "axios";
import Error from "./FormErrors";
import { useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate();
    const[inputs,setInput]=useState({
        email:"",
        pass:"",
        checkbox:""
      })
      const[errors,setErrors]=useState({})
      const[getAuth,setAuth]=useState({})
      const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput(state=>({...state,[nameInput]:value}))
      }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(inputs.email==""){
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
       
        if(inputs.pass==""){
            errorSubmit.pass="Vui lòng nhập pass";
            flag = false;
        }
        if(inputs.checkbox==""){
            errorSubmit.checkbox="Vui lòng chọn";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
                email:inputs.email,
                password:inputs.pass,
                level:0
            }
            axios.post("http://localhost/laravel/public/api/login",data)
            .then(response=>{
                if(response.data.errors){
                    setErrors(response.data.errors)
                    console.log(response)
                }else{
                    localStorage.setItem("data",JSON.stringify(data))
                    console.log(response.data)
                    var auth={}
                    auth.user={}
                    auth.user.auth_token=response.data.token
                    auth.user.auth=response.data.Auth
                    localStorage.setItem("auth",JSON.stringify(auth))
                    navigate('/');
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
            <input type="password" placeholder="Password" name="pass" onChange={handleInput}/>              
            <span>
                <input type="checkbox" className="checkbox" name="checkbox" onChange={handleInput}/> 
                    Keep me signed in
            </span>
            <button type="submit" className="btn btn-default">Login</button>
            <Error errors={errors}/>
        </form>
    )
}
export default Login;