import React, {useState,useEffect} from 'react';
import {useParams, useLocation,useNavigate, Link} from "react-router-dom";
import axios from 'axios';
function Product(){
    const[getProduct,setProduct]=useState('')
    useEffect(()=>{
        var userData = localStorage.getItem("auth")
        if(userData){
            userData=JSON.parse(userData)
        }
        let accessToken=userData.user.auth_token;
        let config = { 
          headers: { 
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
          } 
        };
        axios.get('http://localhost/laravel/public/api/user/my-product',config)
        .then(response=>{
          setProduct(response.data.data)
          console.log(response.data.data)
        })
        .catch(function(error){
          console.log(error)
        })
      },[])
      //console.log(getProduct)
      
      function renderProduct(){
        if(Object.keys(getProduct).length>0){
          return Object.keys(getProduct).map((key,index)=>{
            var arr= getProduct[key]['image'];
            let img = JSON.parse(arr)
            console.log(img)
            
            let id_user=getProduct[key]['id_user']
            console.log(id_user)
            //hàm xoá
            function Delete(){
              
              let id = getProduct[key]['id']
              var userData = localStorage.getItem("auth")
              if(userData){
                  userData=JSON.parse(userData)
              }
              let accessToken=userData.user.auth_token;
              let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
              };
              axios.get("http://localhost/laravel/public/api/user/product/delete/"+id,config)
              .then((res)=>{
                setProduct(res.data.data)
              })
            }
            return(
                    <tr>
                      <td>
                        <p>{getProduct[key]['id']}</p>
                      </td>
                      <td>
                        <p>{getProduct[key]['name']}</p>
                      </td>
                      <td>
                        <img src={"http://localhost/laravel/public/upload/product/" + id_user + "/"+ img[0]} alt="8888" width="50px" height="50px"></img>
                      </td>
                      <td>
                        <p>{getProduct[key]['price']}</p>
                      </td>
                      <td className="cart_delete">
                        <button onClick={Delete} className="btn">Xoá</button>
                      </td>
                      <td>
                        <Link to={"/account/edit/"+getProduct[key]['id']} className='btn'>Edit</Link>
                      </td>
                    </tr>
            )
          })
        }
      }
        
        
    return(
        <div className="col-sm-9">
            <section id="cart_items">
        <div className="container width1">
          
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="id">Id</td>
                  <td className="Name">Name</td>
                  <td className="image">Img</td>
                  <td className="price">Price</td>
                  <td>Action</td>
                  <td />
                </tr>
              </thead>
              
                <tbody>
                  {renderProduct()}
                </tbody>
              
            </table>
            <Link to="/account/addproduct" className="btn">Add New</Link>
          </div>
        </div>
      </section> {/*/#cart_items*/}
        </div>    
    )
}

export default Product;