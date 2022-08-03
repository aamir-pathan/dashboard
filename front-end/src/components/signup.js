import React,{useState,useEffect} from 'react';
import {useNavigate,} from 'react-router-dom';

const Signtup = ()=>{
    const [name,setNames] = useState('');
    const [email,setEmails] = useState('');
    const [password,setPasswords] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });  
    const getDta = async ()=>{
       console.log(name,email,password)
       let result = await fetch('http://localhost:4000/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers:{'Content-Type':'application/json'}
       });
       result = await result.json();
       console.log(result)
       localStorage.setItem('user',JSON.stringify(result.result))
       localStorage.setItem('token',JSON.stringify(result.authh))
       navigate('/');
   }
    return(
        <div className='signup-container'>
            <h1 align="center">Signup or Register from signup components</h1>
            <div className='regi-div'>
            {/* <input type="text" onChange={(e)=>console.warn(e)}
                 placeholder="test"/> */}
                <input type="text" value={name} onChange={(e)=>setNames(e.target.value)}
                 placeholder="please and your name"/>
                <input type="text" value={email} onChange={(e)=>setEmails(e.target.value)} placeholder="email address"/>
                <input type="text" value={password} onChange={(e)=>setPasswords(e.target.value)} placeholder="password"/>
                <button type='button' onClick={getDta}>Signup</button>
            </div>
        </div>
    )
}

export default Signtup;