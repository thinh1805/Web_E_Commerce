import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
function Index(){
    return(
        <div>
        <div className="col-sm-4 col-sm-offset-1">
          <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <Login/>
          </div>{/*/login form*/}
        </div>
        <div className="col-sm-1">
          <h2 className="or">OR</h2>
        </div>
        <div className="col-sm-4">
          <div className="signup-form">{/*sign up form*/}
            <h2>New User Signup!</h2>
            <Register/>
          </div>{/*/sign up form*/}
        </div>
      </div>
    )
}
export default Index;