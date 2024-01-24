import { useEffect,useState } from 'react';
import Error from "./FormErrors";
import { useParams } from "react-router-dom";
import axios from 'axios';
function Account(){
    const[errors,setErrors]=useState("")
    const[user,setUser]=useState({
        username:"",
        email:"",
        address:"",
        phone:"",
        pass:""
    });
    useEffect(()=> {
        let userData=localStorage.getItem("auth");
        if(userData){
            userData = JSON.parse(userData);
            userData = userData.user
            console.log(userData)
            setUser({
                username:userData.auth.name,
                email:userData.auth.email,
                address:userData.auth.address,
                phone:userData.auth.phone
            });
        }
    },[])
    
    function handleInput(e){
        const getName = e.target.name;
        const value = e.target.value;
        setUser(state=>({...state,[getName]:value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(user.username==""){
            errorSubmit.username="Vui lòng nhập tên ";
            flag = false;
        }
        if(user.email==""){
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
        if(user.phone==""){
            errorSubmit.phone="Vui lòng nhập số điện thoại";
            flag = false;
        }
        if(user.address==""){
            errorSubmit.address="Vui lòng nhập địa chỉ";
            flag = false;
        }
        
        
        if(!flag){
            setErrors(errorSubmit);
        }else{
             var userData = localStorage.getItem("auth")
              if(userData){
                userData=JSON.parse(userData)
              }
              let url='http://localhost/laravel/public/api/user/update/' + userData.user.auth.id
              let accessToken=userData.user.auth_token;
              console.log(accessToken)
              let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
              };
              const formData= new FormData();
                formData.append('id_user',userData.user.auth.id);
                formData.append('name',user.username)
                formData.append('email',user.email);
                formData.append('phone',user.phone);
                formData.append('password',user.pass ? user.pass : "");
                formData.append('address',user.address);
                axios.post(url,formData,config)
                .then(response=>{
                  console.log(response)
                })
        }
    }
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">User Update</h2>
                <div className="col-sm-4 col-sm-offset-1">
                    <div className="update-form float-right">
                        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" name="username" onChange={handleInput} value={user.username}/>
                            <input type="email" placeholder="Email Address" name="email" onChange={handleInput} value={user.email} readOnly/>
                            <input type="password" placeholder="Password" name="pass" onChange={handleInput} value={user.pass}/>
                            <input type="text" placeholder="Phone" name ="phone" onChange={handleInput} value={user.phone}/>
                            <input type="text" placeholder="Address" name="address" onChange={handleInput} value={user.address}/>
                            <Error errors={errors}/>
                            <button type="submit" className="btn btn-default">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account;