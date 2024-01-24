import { useContext, useEffect,useState } from 'react';
import {useParams, useLocation,useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import { UserContext } from './UserContext';
function Cart(){
  const value = useContext(UserContext)
  console.log(value)
  var product = localStorage.getItem("product")
  if(product){
    product = JSON.parse(product)
  }
  const[getProduct,setProduct]= useState("")
  useEffect(()=>{
    axios.post('http://localhost/laravel/public/api/product/cart',product)
    .then(response=>{
      console.log(response.data.data)
      setProduct(response.data.data)
    })
    .catch(function(error){
      console.log(error)
    })
  },[])

  function qtyUp(e){
    let id = e.target.id
    let getProduct2 = [...getProduct]
    if(Object.keys(getProduct2).length>0){
        Object.keys(getProduct2).map((key,index)=>{ 
        if(id==getProduct2[key]['id']){
          getProduct2[key]['qty']++;
        }
       })
    } 
    var product = localStorage.getItem("product")
    if(product){
      product =JSON.parse(product)
      if(Object.keys(product).length>0){
        Object.keys(product).map((key,index)=>{
          if(key == id){
            product[key] +=1
          }
        })
      }
    }
    localStorage.setItem("product",JSON.stringify(product))
    setProduct(getProduct2)
  }
  function qtyDown(e){
    let id=e.target.id ;
    let getProduct3 = [...getProduct]
    let objCha={}
    if(Object.keys(getProduct3).length>0){
      Object.keys(getProduct3).map((key,index)=>{
        if(id==getProduct3[key]['id']){
          getProduct3[key]['qty']--;
          if(getProduct3[key]['qty']<1){
            delete getProduct3[key];
          }
        }
      })
      getProduct3 = getProduct3.filter((value,key)=>{
        return value;
      })
      var product = localStorage.getItem('product')
      if(product){
        product= JSON.parse(product)
      
        if(Object.keys(product).length>0){
          Object.keys(product).map((key,index)=>{
            if(key == id ){
              product[key] -=1
              if(product[key] <1){
                delete product[key]
              }
            }
          })
        }
      }
      localStorage.setItem("product",JSON.stringify(product))
      setProduct(getProduct3)
  }
  }

  function Delete(e){
    let id=e.target.id ;
    let getProduct4 = [...getProduct]
    let objCha ={};
    if(Object.keys(getProduct4).length>0){
      Object.keys(getProduct4).map((key,index)=>{
        if(id==getProduct4[key]['id']){
            delete getProduct4[key];
        }
      })
    }
    getProduct4 = getProduct4.filter((value,key)=>{
        return value;
    })

    var product = localStorage.getItem("product")
    if(product){
      product =JSON.parse(product)
      if(Object.keys(product).length>0){
        Object.keys(product).map((key,index)=>{
          console.log(key)      
          if(key == id){
            delete product[key]
          }
        })
      }
      //console.log(product)
    }
    localStorage.setItem("product",JSON.stringify(product))
    setProduct(getProduct4)
  }
  
  function Total(e){
    if(Object.keys(getProduct).length>0){
      let total = 0;
      let sum =0;
      let totalQty =0;
      Object.keys(getProduct).map((key,index)=>{
        let price = getProduct[key]['price']
        let qty =getProduct[key]['qty']
        totalQty +=qty
        value.loginContext(totalQty)
        sum =price *qty
        total +=sum
      })
      return(
        <div className="total_area">
           <ul>
             <li>Cart Sub Total <span>$59</span></li>
             <li>Eco Tax <span>$2</span></li>
             <li>Shipping Cost <span>Free</span></li>
             <li>Total <span>{total}</span></li>
           </ul>
           <a className="btn btn-default update" href>Update</a>
           <a className="btn btn-default check_out" href>Check Out</a>
         </div>
      )
    }

  }
  function renderProduct(){
    if(Object.keys(getProduct).length>0){
      return Object.keys(getProduct).map((key,index)=>{
        let sum =0;
        var arr= getProduct[key]['image'];
        let img = JSON.parse(arr)
        let id_product = getProduct[key]['id']
        let id_user=getProduct[key]['id_user']
        let name = getProduct[key]['name']
        let price = getProduct[key]['price']
        let qty =getProduct[key]['qty']
        //console.log(qty)
       
        return(
              <tr >
                <td className="cart_product">
                  <a href><img src={"http://localhost/laravel/public/upload/product/" + id_user + "/"+ img[0]} alt="8888" width="100px" height="50px" /></a>
                </td>
                <td className="cart_description">
                    {name}
                </td>
                <td className="cart_price">
                  <p>${price}</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a id={id_product} className="cart_quantity_up" href="#" onClick={qtyUp} > + </a>
                    <input className="cart_quantity_input" type="text" name="quantity" value={qty} autoComplete="off" size={2} />
                    <a id={id_product} className="cart_quantity_down" href="#" onClick={qtyDown}> - </a>
                  </div>
                </td>
                <td className="cart_total">
                  <p className="cart_total_price">{qty*price}$</p>
                </td>
                <td className="cart_delete">
                  <a id = {id_product} className="cart_quantity_delete" href="#" onClick={Delete}><i class="fa-solid fa-trash"/>x</a>
                </td>
              </tr>
        )
      })
    }
  }
    return(
    <div>
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li><a href="#">Home</a></li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td/>
              </tr>
            </thead>
            <tbody>
              {renderProduct()}
            </tbody>
          </table>
        </div>
      </div>
    </section> 
     <section id="do_action">
     <div className="container">
       <div className="heading">
         <h3>What would you like to do next?</h3>
         <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
       </div>
       <div className="row">
         <div className="col-sm-6">
           <div className="chose_area">
             <ul className="user_option">
               <li>
                 <input type="checkbox" />
                 <label>Use Coupon Code</label>
               </li>
               <li>
                 <input type="checkbox" />
                 <label>Use Gift Voucher</label>
               </li>
               <li>
                 <input type="checkbox" />
                 <label>Estimate Shipping &amp; Taxes</label>
               </li>
             </ul>
             <ul className="user_info">
               <li className="single_field">
                 <label>Country:</label>
                 <select>
                   <option>United States</option>
                   <option>Bangladesh</option>
                   <option>UK</option>
                   <option>India</option>
                   <option>Pakistan</option>
                   <option>Ucrane</option>
                   <option>Canada</option>
                   <option>Dubai</option>
                 </select>
               </li>
               <li className="single_field">
                 <label>Region / State:</label>
                 <select>
                   <option>Select</option>
                   <option>Dhaka</option>
                   <option>London</option>
                   <option>Dillih</option>
                   <option>Lahore</option>
                   <option>Alaska</option>
                   <option>Canada</option>
                   <option>Dubai</option>
                 </select>
               </li>
               <li className="single_field zip-field">
                 <label>Zip Code:</label>
                 <input type="text" />
               </li>
             </ul>
             <a className="btn btn-default update" href>Get Quotes</a>
             <a className="btn btn-default check_out" href>Continue</a>
           </div>
         </div>
         <div className="col-sm-6">
           {Total()}
         </div>
       </div>
     </div>
   </section>
   </div>
    )
}
export default Cart;