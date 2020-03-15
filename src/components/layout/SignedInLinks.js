import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {signOut } from '../../store/actions/authActions'
const logo = require('./logo.jpg');
const SignedInLinks = (props) => {
  return (
    <div>
       <img class="media-obj" src={logo} height="60" width = "67"/>
      <Link to='/firstpage2' className="brand-logo "><dt>KMITL Delivery</dt></Link>
      <ul className="right">
        <li><NavLink to='/'><dt>Place order</dt></NavLink></li>
        {/* <li><NavLink to='/create'>New Project</NavLink></li> */}
        {/* <li><NavLink to='/manage'><dt>Manage Paymant</dt></NavLink></li> */}
        <li><NavLink to='/history'><dt>History</dt></NavLink></li>
      
        <li><a onClick={props.signOut} class="btn btn-danger"><dt>Log Out</dt></a></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)