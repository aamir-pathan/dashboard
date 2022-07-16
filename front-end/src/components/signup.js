import React,{useState} from 'react';


const Signtup = ()=>{
    const [name,setNames] = useState('');
    const [email,setEmails] = useState('');
    const [password,setPasswords] = useState('');
    const getDta = ()=>{
    console.log(name,email,password)
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