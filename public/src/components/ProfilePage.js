import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "", description: ""
       };
  }

  componentWillMount() {
    this.getAllProfileBlogs();

    this.setState({ loggedInUser: this.props.userInSession });
  }

  componentWillReceiveProps(nextprops){
    this.setState({ loggedInUser: nextprops.userInSession });

  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description} = this.state;
    axios.post(process.env.REACT_APP_BASE_URL + "/profile/post", {title, description } , {withCredentials: true}) 
    .then( () => {
        // this.props.getData();
        this.setState({title: "", description: ""});
        this.getAllProfileBlogs();
        
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  getAllProfileBlogs = () =>{
    axios.get(process.env.REACT_APP_BASE_URL + `/profile/${this.props.match.params.id}/blogs`)
    .then(responseFromApi => {
      // console.log("this is the response from the axios get -=-=-=-=",responseFromApi.data);


      let othersBlogs = []


      responseFromApi.data.favoriteUsers.forEach((onePerson)=>{
        // console.log("the first for each 1111111111111111111111", onePerson);

        onePerson.blogs.forEach((oneBlog)=>{
          // console.log("the third for each 33333333333333333333333");
          othersBlogs.push(oneBlog)
        })
        // console.log("the ending of the first for each 444444444444444444");    
      })

      // console.log("the state after the axios call $$$$$$$$$$$$$$$$$$$$$$$$$$$ ", othersBlogs);
      this.setState({
        theProfile: responseFromApi.data,
        othersBlogs: othersBlogs,
      })
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  showUserBlogs() {
    if(this.state.theProfile) {
      // console.log("the state when trying to show blogs.. ..... ...... .. .... .... .", this.state.theProfile.blogs)
      return (
        this.state.theProfile.blogs.map((blog, index) => {
         return <div className= "blogs" key={index}>
           <Link to = {`/blogs/${blog._id}`}>
            <h3> {blog.title} </h3>
           </Link>
            <p>{blog.description}</p>
          </div>
        })
      )
    }
  }

  showFavoriteUserBlogs() {
    if(this.state.othersBlogs) {
      // console.log("the state when trying to show favorite users blogs 909090909090909090909", this.state.othersBlogs.blogs);
      return (
        this.state.othersBlogs.map((blog, index) => {
          return <div className= "favoriteBlogs" key={index}>
          <Link to = {`/blogs/${blog._id}`}>
            <h3>{blog.title}</h3>
          </Link>
            <p>{blog.description}</p>
          </div>
        })
      )
    }
  }

  componentDidMount() {
    this.getAllProfileBlogs();
  }

  render() {
      // console.log('=this is the state entering profile page',this.state);
      // console.log('=this is the props entering profile page $$$$$$$$$$$',this.state.loggedInUser.username);
      return (
        <div className="ProfilePage">
          <div className="profileHead">
            <h1>{this.state.loggedInUser && this.state.loggedInUser.username}</h1>
            <h3>Post</h3>

            <form onSubmit={this.handleFormSubmit}>
              <label>Blog Title</label>
              <br/>
              <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
              <br/>
              <label>Blog Description</label>
              <br/>
              <input className="description" type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} placeholder="Post Description"/>
              <br/>
              <input type="submit" value="Submit" />
            </form>

          <br/>
        <div className="allBlogs">
          {this.showUserBlogs()}
          {this.showFavoriteUserBlogs()}
        </div>
          </div>
      </div>
    );
  }
  }
  
export default ProfilePage;