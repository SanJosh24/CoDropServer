import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props);
    // this.state = { username: "", password: "", email: ""};
    this.state={loggedInUser: null}
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    var username = this.state.username;
    var password = this.state.password;

    this.service.login(username, password)
    // console.log("this is the current state when creating a task ------------------" , theTask)
    .then( (response) => {
      console.log("this is the current state when logging in user ------------------" , response);
        // this.setState({username: "", password: "", email: ""});
        this.setState({loggedInUser: response});
        this.props.getUser(response)
        this.props.history.push('/')
    })
    .catch( error => console.log('=-=-=-=-=-=-=-=-=-=-=-',error) )
    // console.log(this.state);
    
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}


  render() {
    return (
      <div className="Login">
        <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} className="roundInput x" />
          <br/>
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} className="roundInput z"/>
          <br/>
          {/* <Link to = "/"> */}
          <button type="submit" className="buttonz xyz">Login</button>
          {/* </Link> */}
          <p className="noAccount">Don't have account? <Link to="/signup" className="whiteLink">Signup</Link></p>
        </form>
        </div>
      </div>
    );
  }
}
export default Login;