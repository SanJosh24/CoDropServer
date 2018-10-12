import React, { Component } from 'react';
import './App.css';
import BlogsList from './components/BlogsList';
import BlogsDetails from './components/BlogsDetails';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import ClanList from './components/ClanList';
import AuthService from './components/auth/auth-service';
import ProfilePage from './components/ProfilePage';


class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser = () => {
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    // if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser = {this.getTheUser} />
        <Switch>
          <Route exact path="/" component={LandingPage}/>      
          <Route exact path="/login" render={props => <Login {...props} getUser={this.getTheUser}/>}/>
          <Route exact path="/blogs" component={BlogsList}/>
          <Route exact path="/blogs/:id" component={BlogsDetails}/>
          <Route exact path="/clans" component={ClanList}/>
          <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile/:id" render={(props) => <ProfilePage {...props} userInSession={this.state.loggedInUser}/>}/>
        </Switch>
        </div>
      );
    // } else {
    //   return (
    //     <div className="App">
    //       <Navbar userInSession={this.state.loggedInUser} />
    //       <Switch>
    //         <Route exact path="/" component={LandingPage}/>
            {/* <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/> */}
            {/* <Route exact path="/login" component={Login}/> */}
    //         <Route exact path="/blogs" component={BlogsList}/>
    //         <Route exact path="/clans" component={ClanList}/>
    //       </Switch>
    //     </div>
    //   );
    // }
  }
}

export default App;
