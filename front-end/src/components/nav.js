import React from 'react';
import {Link } from 'react-router-dom';
const Nav = ()=>{
    return(
        <div className='nav-header'>
        <ul>
            <li><Link to = '/'>Home</Link></li>
            <li><Link to = '/add'>Add product</Link></li>
            <li><Link to = '/update'>update product</Link></li>
            <li><Link to = '/signup'>signtup or ragister</Link></li>
        </ul>
    </div>
    )
}

export default Nav;