import React from 'react'
import { NavLink,Link } from 'react-router-dom'
const logo = require('./logo.jpg');
const SignedOutLinks = () => {
  return (
    
    <div>
       <img class="media-obj" src={logo} height="60" width = "67"/>
      <Link to='/firstpage' className="brand-logo ">KMITL Delivery</Link>
      <ul className="right">
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><NavLink to='/signin'class="btn btn-success">Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks