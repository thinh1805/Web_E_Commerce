import Header from "./components/layout/Header";
import Menuleft from "./components/layout/Menuleft";
import Footer from "./components/layout/Footer";
import {useLocation} from "react-router-dom";
import MenuAcc from "./components/layout/MenuAcc";
import None from "./components/layout/None";
import { UserContext } from "./components/UserContext";
import { useEffect, useState } from "react";
function App(props) {
  let params1 = useLocation();
  const [tongQty,settongQty] = useState('')
  console.log(tongQty)
  console.log(params1)
  function render(){
    if(params1['pathname'].includes("account")){
      return (<MenuAcc/>) 
    }
    else if(params1['pathname'].includes("cart")){
      return(<None/>)
    }else{
      return(<Menuleft/>)
    }

    }
    function loginContext(data){
      settongQty(data)
    }
    
  return (
          <div>
          <UserContext.Provider value = {{
              loginContext: loginContext,
              tongQty:tongQty

            }}>
              
            <Header/>
              <section>
                <div className="container">
                  <div className="row">
                    {render()}
                    {props.children}
                  </div>
                </div>
              </section>
            <Footer/>
          </UserContext.Provider>
          </div>
  );
}

export default App;
