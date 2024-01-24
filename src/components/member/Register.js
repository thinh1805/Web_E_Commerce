import Error from "./FormErrors";
import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register(){
    const[inputs,setInput]=useState({
        name:"",
        email:"",
        pass:"",
        phone:"",
        address:"",
        level:"",
      })
      const[errors,setErrors]=useState({})
      const[getFiles,setFiles]=useState("")
      const[avatar,setAvatar]=useState("")
      const handleInput = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput(state=>({...state,[nameInput]:value}))
      }
    //   function IsEmail(email) {
    //     var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //     if(!regex.test(email)) {
    //        return false;
    //     }else{
    //        return true;
    //     }
    //   }
      
    function handleUserInputs(e){
        const file =e.target.files;
        
        let reader=new FileReader();
        reader.onload = (e)=>{
            setAvatar(e.target.result);
            setFiles(file[0]);
            
        };
        reader.readAsDataURL(file[0]);
    }
    console.log(avatar)
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag=true;
        if(inputs.name==""){
            errorSubmit.name="Vui lòng nhập tên";
            flag = false;
        }
        if(inputs.email==""){
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
        // if(IsEmail(inputs.email)==false){
        //     errorSubmit.email="Email phải có @gmail.com vui lòng nhập đúng";
        //     flag=false;
        // }
        if(inputs.pass==""){
            errorSubmit.pass="Vui lòng nhập pass";
            flag = false;
        }
        if(inputs.phone==""){
            errorSubmit.phone="Vui lòng nhập số điện thoại";
            flag = false;
        }
        if(inputs.address==""){
            errorSubmit.address="Vui lòng nhập địa chỉ";
            flag = false;
        }
        if(getFiles==""){
            errorSubmit.files="vui lòng chọn file";
            flag =false;
        }else{
            let size = getFiles['size'];
            
            let allowtypes = ['png','jpg','jpeg',"PNG","JPG"];
            let name =getFiles['name'];
            //console.log(name)
            let split = name.split(".")
            let typesplit= split[1]; 
            //console.log(typesplit)
            if(size>1024*1024){
                errorSubmit.files="Lỗi kích thước quá lớn vui lòng chọn tệp có lượng MB nhỏ hơn";
                flag =false;
            }
            else if(!(allowtypes.includes(typesplit))){
                errorSubmit.files="lỗi";
                flag =false;
            }
        }
        if(inputs.level==""){
            errorSubmit.level ="Vui lòng nhập 1 hoặc 0 ";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }
        if(flag){
            const data={
                name:inputs.name,
                email:inputs.email,
                password:inputs.pass,
                phone:inputs.phone,
                address:inputs.address,
                avatar:avatar,
                level:0,
            }
            console.log(data)
            axios.post("http://localhost/laravel/public/api/register",data)
            .then(response=>{
                if(response.data.errors){
                    setErrors(response.data.errors)
                }else{
                    alert("dang ky thanh cong")
                    console.log(response)
                }
            })
            .catch(function(error){
                console.log(error)
                alert("loi")
            })
        }
}
return(
    <form enctype="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
        <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
        <input type="password" placeholder="Password" name="pass" onChange={handleInput}/>
        <input type="text" placeholder="Phone" name ="phone" onChange={handleInput}/>
        <input type="text" placeholder="Address" name="address" onChange={handleInput}/>
        <input type="file" name="avatar" onChange={handleUserInputs}/>
        <input type="text" placeholder="1.admin or 0.member" name="level" onChange={handleInput}/>
        <Error errors={errors}/>
        <button type="submit" className="btn btn-default">Signup</button>
    </form>
)
}
export default Register;