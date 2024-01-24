import React, {useState,useEffect} from 'react';
import {useParams, useLocation,useNavigate} from "react-router-dom";
import Rate from './Rate';
import Listcomment from './ListComment';
import Comment from './Comment';
import axios from 'axios';
function Detail(){
  let params = useParams();
  const[getData,setData]=useState('');
  const[getComment,setComment]=useState('');
  useEffect(()=>{
    axios.get('http://localhost/laravel/public/api/blog/detail/'+params.id)
    .then(response=>{
      setData(response.data.data)
      setComment(response.data.data.comment)
      console.log(response.data.data.comment)
    })
    .catch(function(error){
      console.log(error)
    })
  },[])
  // console.log(data)
  function fetchData(){
    if(Object.keys(getData).length>0){
      return(
        <div classname="single-blog-post">
          <h3>{getData.title}</h3>
          <a href>
              <img src={"http://localhost/laravel/public/upload/blog/image/" + getData.image} alt="" />
          </a>
          <p>
            {getData.content}
          </p>
          <div classname="pager-area">
            <ul classname="pager pull-right">
              <li><a href="#">Pre</a></li>
              <li><a href="#">Next</a></li>
            </ul>
          </div>
        </div>
      )
    }
  }
  return(
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {fetchData()}
      </div>{/*/blog-post-area*/}
      <Rate/>
      <div className="socials-share">
      <a href><img src="images/blog/socials.png" alt="" /></a>
      </div>{/*/socials-share*/}
      <Listcomment getComment={getComment}/>
      <Comment/> 
    </div>
  )
}
export default Detail;