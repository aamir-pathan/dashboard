import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        let auth = localStorage.getItem('user')
        if(auth){
            navigate('/');
        }
    })
        const handlelogin = async () =>{
            console.warn(email,password)
        let result =  await fetch('http://localhost:4000/login',{
            method : 'post',
            body : JSON.stringify({email,password}),
            headers : {'Content-Type':'application/json'}
        });
        result = await result.json();
          console.log(result);
          if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
          }else alert('this is not match id');
        }
    return(
        <div className="login-foam">
            <h1 align='center'>Login</h1>
            <input type='text' placeholder="Enter email"onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Enter password"onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handlelogin} type="button">Login</button>
        </div>    
    )
}

export default Login;