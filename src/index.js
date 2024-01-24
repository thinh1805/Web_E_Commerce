import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Blog from './components/blog/Blogindex';
import Detail from './components/blog/Detail';
import Index from './components/member/Memberindex';
import reportWebVitals from './reportWebVitals';
import Account from './components/member/Account';
import Product from './components/member/Product';
import AddProduct from './components/member/AddProduct';
import Edit from './components/member/Editproduct';
import DetailProduct from './components/Product-details';
import Cart from './components/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home/>}></Route>
          <Route path="/blog/list" element={<Blog/>}> </Route> 
          <Route path="/blog/detail/:id" element={<Detail/>}> </Route> 
          <Route path="/blog/login" element={<Index/>}></Route>
          <Route path="/account/update" element={<Account/>}></Route>
          <Route path="/account/product" element={<Product/>}></Route>
          <Route path="/account/addproduct" element={<AddProduct/>}></Route>
          <Route path="/account/edit/:id" element={<Edit/>}></Route>
          <Route path="/product/detail/:id" element={<DetailProduct/>}></Route>
          <Route path="/product/cart" element={<Cart/>}></Route>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
