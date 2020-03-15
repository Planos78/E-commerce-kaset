import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import {
  Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody
} from 'reactstrap';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <Card>
        <form onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-1">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' 
            pattern = "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+"
            title="กรุณากรอกอีเมลให้ถูกรูปแบบ"
            onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' 
            pattern="{8,}$"
            title="กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว "
            onChange={this.handleChange} required
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' 
            pattern="^[ก-ฮA-Za-z]{5,}$"
            title="กรุณากรอกชื่ออย่างน้อย 5 ตัว ในช่วง ก-ฮ , A-Z , a-z"
            onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' 
           pattern="^[ก-ฮA-Za-z]{5,}$"
           title="กรุณากรอกนามสกุลอย่างน้อย 5 ตัว ในช่วง ก-ฮ , A-Z , a-z"
            onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <button className="btn btn-success btn-md btn-block grey darken-2">Sign Up</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)