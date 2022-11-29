import React, { Component, useState, useEffect } from 'react'
import { toast } from "react-toastify";
import UserAPI from '../API/UserAPI'
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

// import "./login.scss";
import { login } from "../redux/toolskit/userSlice";
// import { getMyCarts } from "../../../redux/toolkits/cartSlice";
import "./Login.scss";



const Login = () => {
    const [hiddenPassword, setHiddenPassword] = useState(false);
    const [submit, setSubmit] = useState({});
    const [obj, setObj] = useState({});
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    localStorage.removeItem("isAuthenticated");
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const history = useNavigate();
  
    const {loading} = useSelector(state => state.userState)
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://18.140.66.234/api/auth/login";
        await fetch(url,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
          method:"POST",
          body:JSON.stringify({
            username: username,
            password: password,
          }),
        }      
        ).then(res => {
            return res.json()
        }).then((data) => {
            localStorage.setItem("accessToken",JSON.stringify(data.accessToken) );
            console.log(data)
        })
        
        // if (res.status === 200) {
        //     console.log('123', res)
        //     localStorage.setItem(
        //       "accessToken",
        //       JSON.stringify(res.accessToken)
        //     );
        //     // localStorage.setItem(
        //     //   "refreshToken",
        //     //   JSON.stringify(res.refreshToken)
        //     // );
        //     localStorage.setItem("name", JSON.stringify(res.name));
        //     localStorage.setItem("roles", JSON.stringify(res.roles));

        //   }
      };
      
    return (
        <div className="login-box">
            <h2>Login</h2>
            <form>
                <div className="user-box">
                <input 
                type="text" 
                name="username" 
                value = {username}
                // onChange={(e)=>{
                //     setObj((old)=>{
                //       const newobj = {...obj,username:e.target.value};
                //       return newobj
                //     }) 
                //   }}
                onChange={(e) => { setUsername(e.target.value) }}
                required=""/>
                <label>Username</label>
                </div>
                <div className="user-box">
                <input 
                type="password" 
                name="password" 
                value = {password}
                // onChange={(e)=>{
                //     setObj((old)=>{
                //       const newobj = {...obj,password:e.target.value};
                //       return newobj
                //     }) 
                //   }}
                onChange={(e) => { setPassword(e.target.value) }}
                required=""
                />
                <label>Password</label>
                </div>
                <a href="" onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
                </a>
            </form>
        </div>
    )

}

export default Login