import React from 'react';
import {Link,useNavigate } from 'react-router-dom';
const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear()
        navigate('/signup')
    }
    return(
        <div className='nav-header'>
        <ul>
            <li><Link to = '/'>Home</Link></li>
            <li><Link to = '/add'>Add product</Link></li>
            <li><Link to = '/update'>update product</Link></li>
            <li>{ auth ? <Link to = '/signup' onClick={logout}>Logout</Link> : <Link to = '/signup'>signtup or ragister</Link>}</li>
            <li><Link to = '/login'>Login</Link></li>
        </ul>
    </div>
    )
}

export default Nav;