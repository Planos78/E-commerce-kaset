import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom'
import {
  Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody
} from 'reactstrap';
//import './index.css';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    isSignedIn: false
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }


  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />
    if (!this.state.isSignedIn) 
    {
      return (
        <div className="container">
          <Card>
          <form  onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-1">Sign In</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' 
              pattern = "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+"
              title="กรุณากรอกอีเมลให้ถูกรูปแบบ"
              onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' 
              pattern="^[A-Za-z0-9]{8,}$"
              title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว ในช่วง A-Z , a-z ,0-9"
              onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn btn-success btn-md btn-block grey darken-2">Login</button>
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
          </Card>
          <div className="container">
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        <h1>FirebaseUI-React</h1>
        <h1> with Firebase Authentication</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)