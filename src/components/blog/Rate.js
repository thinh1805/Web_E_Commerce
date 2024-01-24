import { useEffect,useState } from 'react';
import StarRatings from 'react-star-ratings';
import Tag from './TagofRate';
import {useParams, useLocation,useNavigate} from "react-router-dom";
import axios from 'axios';

function Rate(){
    var params = useParams();
    var data =localStorage.getItem("data")
    if(data){
      data=JSON.parse(data)
    }
    const[errorlogin,setCheckLogin]=useState("")
    const [rating, setRating] = useState(0);
    function RateStar(){
        
        function changeRating( newRating, name ) {
          setRating(newRating)
          // - xu ly logic
          // - gui qua api
          if(!data){
            setCheckLogin("vui lòng đăng nhập để bình luận")
          }
          else{
            var userData = localStorage.getItem("auth")
              if(userData){
                userData=JSON.parse(userData)
              }
              let url='http://localhost/laravel/public/api/blog/rate/' + params.id
              let accessToken=userData.user.auth_token;
              console.log(accessToken)
              let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
              };
              const formDataRate= new FormData();
                formDataRate.append('blog_id',params.id);
                formDataRate.append('user_id',userData.user.auth.id);
                formDataRate.append('rate',rating);
                
                axios.post(url,formDataRate,config)
                .then(response=>{
                  console.log(response)
                  
                })
                
          }
        }
        
        
          // rating = 2;
          return (
            <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          );
        
    }
    
    useEffect(()=>{
      axios.get("http://localhost/laravel/public/api/blog/rate/"+params.id)
        .then(response=>{
          console.log(response.data.data) //=> array.lentgh
          var tbc =0;
          var tong=0;
          var dodai = response.data.data.length
          console.log(dodai)
          response.data.data.map(function(value, key){
            tong = tong + value.rate;
          })
        tbc = tong/dodai
         console.log(tbc)
          // tbc = tong qty/tong so ng danh gia
          setRating(tbc)
        })
        .catch(function(error){
        console.log(error)
      })
      },[])
          
    

    return(
    <div className="rating-area">
      <ul className="ratings">
        <li className="rate-this">Rate this item:</li>
        {RateStar()}
        
        <li className="color">(5 votes)</li>
      </ul>
      <Tag/>
    </div>//rating-area
    )
}
export default Rate;