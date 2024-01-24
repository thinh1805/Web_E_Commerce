import { useEffect,useState } from 'react';
import Error from "./FormErrors";
import { useParams } from "react-router-dom";
import axios from 'axios';
function AddProduct(){
    const[inputs,setInputs]=useState({
        name:"",
        price:"",
        category:"",
        brand:"",
        status:1,
        profile:"",
        avatar:"",
        detail:"",
        sale:""
    })
    const[getStatus,setStatus]=useState("")
    const[getCategory,setCategory]=useState("")
    const[getBrand,setBrand]=useState("");
    const[errors,setErrors]=useState({})
    const[getFiles,setFiles]=useState("")
    const handleInput =(e) => {
        const nameInput=e.target.name;
        console.log(nameInput)
        const valueInput=e.target.value;
        console.log(valueInput)
        setInputs(state=>({...state,[nameInput]:valueInput}))
        
    }
    useEffect(()=>{
        axios.get('http://localhost/laravel/public/api/category-brand')
        .then(response=>{
          setCategory(response.data.category)
          setBrand(response.data.brand)
          console.log(response)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    function renderCategory(){
        if(getCategory.length>0){
            return getCategory.map((value,key)=>{
                //console.log(value.category)
              return(
                <option value={value.id}>{value.category}</option>
              )
            })
        }
    }
    function renderBrand(){
        if(getBrand.length>0){
            return getBrand.map((value,key)=>{
                //console.log(value.brand)
              return(
                <option value={value.id}>{value.brand}</option>
              )
            })
        }
    }
    function hanldeFiles(e){
        setFiles(e.target.files);
        console.log(e.target.files);
    }
    // function handleFile(e){
    //     if(getFiles==""){
    //         console.log("lỗi")
    //     }
    // }
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {};
        let flag=true;
        if(inputs.name==""){
            errorSubmit.name = "Vui lòng nhập tên sản phẩm";
            
            flag = false;
        }
        if(inputs.price==""){
            errorSubmit.price="Vui lòng nhập giá sản phẩm";
            flag = false;
        }
        if(inputs.category==""){
            errorSubmit.category="vui lòng chọn loại sản phẩm";
            flag = false;
        }
        if(inputs.brand==""){
            errorSubmit.brand="vui lòng chọn thương hiệu sản phẩm";
            flag = false;
        }
        if(inputs.profile==""){
            errorSubmit.profile="vui lòng ghi profile";
            flag = false;
        }
        
        if(getFiles==""){
            errorSubmit.files="vui lòng chọn file";
            flag =false;
        }else{
            console.log(getFiles)
            Object.keys(getFiles).map((key,index)=>{
                let size = getFiles[key]['size']
                console.log(size)            
                let allowtypes = ['png','jpg','jpeg',"PNG","JPG"];
                let name = getFiles[key]['name']                
                
                console.log(name)
                let split = name.split(".")
                let typesplit= split[1]; 
                console.log(typesplit)
                if(size>1024*1024){
                    errorSubmit.files="Lỗi kích thước quá lớn vui lòng chọn tệp có lượng MB nhỏ hơn";
                    flag =false;
                }
                else if(!(allowtypes.includes(typesplit))){
                    errorSubmit.files="lỗi";
                    flag =false;
                }
            })
        }
        if(inputs.detail==""){
            errorSubmit.detail="vui lòng nhập chi tiết về sản phẩm";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        }else{
            var userData = localStorage.getItem("auth")
              if(userData){
                userData=JSON.parse(userData)
              }
            let url='http://localhost/laravel/public/api/user/product/add' 
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
                formData.append('name',inputs.name);
                formData.append('price',inputs.price);
                formData.append('category',inputs.category);
                formData.append('brand',inputs.brand);
                formData.append('company',inputs.company);
                formData.append('detail',inputs.detail);
                formData.append('status',inputs.status);
                formData.append('sale',inputs.sale);
                Object.keys(getFiles).map((item,i)=>{
                    formData.append("file[]",getFiles[item]);
                })
                axios.post(url,formData,config)
                .then(response=>{
                  console.log(response)
                  alert("xx")
                })
        }
    }   
    function sales(){
        if(inputs.status==0){
            return(
                <div>
                    <input type="text" placeholder="0" name="sale"  onChange={handleInput} className='width mb10'/><p>%</p>
                </div>
            )
        }
    }

    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Create Product</h2>
                <div className="col-sm-4 col-sm-offset-1">
                    <div className="update-form float-right">
                        <form enctype="multipart/form-data" onSubmit={handleSubmit} >
                            <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                            <input type="text" placeholder="Price" name="price" onChange={handleInput}/>
                            <select value={inputs.category} name="category" onChange={handleInput} className="mb10">
                                {renderCategory()} 
                            </select>
                            <select value={inputs.brand} name="brand" onChange={handleInput} className="mb10">
                                {renderBrand()} 
                            </select>

                            <select value={inputs.status} name="status" onChange={handleInput} className="mb10">
                                <option value={1}>new</option>
                                <option value={0} name="sale">sale</option>
                            </select>
                            {sales()}
                            
                            <input type="text" placeholder="Company profile" name="profile" onChange={handleInput} />
                            <input type="file" name="avatar" onChange={hanldeFiles} multiple/>
                            <input type="text" placeholder="Detail" name="detail" onChange={handleInput} />
                            <Error errors={errors}/>
                            <button type="submit" className="btn btn-default">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;