import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
function Comment(){
  let params=useParams();
  
  const [inputComment,setInputComment]=useState("")
  const [errorComment,seterrorComment]=useState("")
  
  var data= localStorage.getItem("data")
    if(data){
      data= JSON.parse(data);
    }
    function handleInput(e){
        setInputComment(e.target.value)
    }
    const[errorlogin,setCheckLogin]=useState("")
    function HandlePostComment(e){
        e.preventDefault();
        if(!data){
            setCheckLogin("Vui lòng đăng nhập để bình luận")
        }else{
            if(inputComment==""){
                seterrorComment("Vui lòng nhập bình luận")
            }else{
              var userData = localStorage.getItem("auth")
              if(userData){
                userData=JSON.parse(userData)
              }
              let url='http://localhost/laravel/public/api/blog/comment/' + params.id
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
                formData.append('id_blog',params.id);
                formData.append('id_user',userData.user.auth.id);
                formData.append('id_comment',0)
                formData.append('comment',inputComment);
                formData.append('image_user',userData.user.auth.avatar);
                formData.append('name_user',userData.user.auth.name);
                axios.post(url,formData,config)
                .then(response=>{
                  console.log(response)
                  
                })

            }
        }
        
    }
    return(
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <form onSubmit={HandlePostComment}>
                <textarea name="message" rows={11} defaultValue={""} value={inputComment} onChange={handleInput} />
                <p>{errorComment}</p>
                <button type="submit" className="btn btn-primary" href>post comment</button>
                <p>{errorlogin}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Comment;