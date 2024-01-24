import React, {useState,useEffect} from 'react';
import {useParams, useLocation,useNavigate} from "react-router-dom";
import axios from 'axios';
function Listcomment(props){
  let {getComment}=props
  function fetchData(){
    if(Object.keys(getComment).length>0){
      return getComment.map((value,key)=>{
        return(
          <li key={key} className="media">
            <a className="pull-left" href="#">
              <img className="media-object" src={"http://localhost/laravel/public/upload/user/avatar/"+ value.image_user} width="50" alt="" />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li><i className="fa fa-user" />Janis Gallagher</li>
                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
              </ul>
              <p>{value.comment}</p>
              <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
            </div>
          </li>
          
          
        )
      })
    }
  }
  return(
      <div className="response-area">
      <h2>3 RESPONSES</h2>
      <ul className="media-list">
        {fetchData()} 
      </ul>					
    </div>/*/Response-area*/
  )
}
export default Listcomment;