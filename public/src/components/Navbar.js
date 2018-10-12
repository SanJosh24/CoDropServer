import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AuthService from './auth/auth-service';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillMount() {
    this.setState({ loggedInUser: this.props.userInSession});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loggedInUser: nextProps.userInSession });
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log("current state of the user ^^^^^^^^^^^^^^^^^^^^ ", this.props);
    if(this.state.loggedInUser){
      return(
      <div className="Navbar">
        <nav className="navbar navi">
          <img alt="Brand" src="/CoDrop.jpg" />
          <Link to ="/">
          <button className="buttonz">Home</button>
          </Link>
          <Link to = "/blogs">
          <button className="buttonz">Blogs</button>
          </Link>
          <Link to = "/clans">
          <button className="buttonz">Clans</button>
          </Link>
          <Link to = {`/profile/${this.props.userInSession._id}`}>
          <button className="buttonz">My Profile</button>
          </Link>
          <Link to = "/signup">
          <button className="buttonz">Messages</button>
          </Link>
          <Link to='/'>
                <button onClick={() => this.logoutUser()} className="buttonz">Logout</button>
          </Link>
        </nav>
      </div>
      )
    } else {
      return (
      <div className="Navbar">
        <nav className="navbar navi">
          <img alt="Brand" src="/CoDrop.jpg" />
          <Link to ="/">
          <button className="buttonz">Home</button>
          </Link>
          <Link to = "/blogs">
          <button className="buttonz">Blogs</button>
          </Link>
          <Link to = "/clans">
          <button className="buttonz">Clans</button>
          </Link>
          <Link to = "/login">
          <button className="buttonz">Login</button>
          </Link>
          <Link to = "/signup">
          <button className="buttonz">Signup</button>
          </Link>
        </nav>
      </div>
      )
    }
  }
}

export default Navbar;