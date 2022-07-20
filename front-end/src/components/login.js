import React from "react";

const Login = ()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const LoginGet = ()=>{
        console.warn(email,password)
    }
    return(
        <div className="login-foam">
            <h1 align='center'>Login</h1>
            <input type='text' placeholder="Enter email"onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Enter password"onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={LoginGet} type="button">Login</button>
        </div>    
    )
}

export default Login;