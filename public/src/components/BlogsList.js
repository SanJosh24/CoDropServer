import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class BlogsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllBlogs = () => {
    axios.get('http://localhost:5000/api/blogs')
    .then(responseFromApi => {
      console.log("lalalalalalalalalala",this.state);
      this.setState({
        listOfBlogs: responseFromApi.data
      })
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  showBlogs() {
    if(this.state.listOfBlogs) {
      // console.log("the state when trying to show blogs.. ..... ...... .. .... .... .", this.state.theProfile.blogs)
      return (
        this.state.listOfBlogs.map((blog, index) => {
          console.log("=-=-=-=-=-=-=-=-=-",blog);
          
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

  componentWillMount() {
    // this.getAllProfileBlogs();
    this.setState({ loggedInUser: this.props.userInSession });
  }

  componentWillReceiveProps(nextprops){
    this.setState({ loggedInUser: nextprops.userInSession });
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  render() {
    console.log("bruuhhhhhhhhhhhhhhhhhhhh",this.state);
    return (      
      <div className="BlogsList">
        <h1>List of all blogs</h1>
        <br/>
        <div className="allBlogs">
        {this.showBlogs()}
        </div>
      </div>
    );
  }
}
export default BlogsList;