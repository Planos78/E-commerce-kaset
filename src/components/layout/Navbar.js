import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'


const Navbar = (props) => {
  const { auth } = props;
  //console.log(auth);
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks /> 
  return (
    <nav className="nav-wrapper blue-grey lighten-1">
      <div className="container">
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)