import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', email: '' };
		this.service = new AuthService();
	}

	handleFormSubmit = (event) => {
		event.preventDefault();

		// const {title, description} = this.state;

			var username = this.state.username;
			var password = this.state.password;
			var email = this.state.email;

    this.service.signup(username, password, email)
    .then((res) => {
			// axios
			// 	.post(process.env.REACT_APP_BASE_URL + '/signup', {username, password, email})
			// 	.then((response) => {
					console.log('this is the current state when creating a task ------------------', res);
					this.setState({ username: '', password: '', email: '' });
				})
		// 		.catch((error) => console.log('=-=-=-=-=-=-=-=-=-=-=-', error));
    // })
    .catch((err)=>
      console.log("error message for this.service.signup", err)
    )
		// console.log("this is the current state when creating a task ------------------" , theTask)
		// this.props.getData();
		// console.log(this.state);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="Signup">
				<div>
					<form onSubmit={this.handleFormSubmit}>
						<label>Username</label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={(e) => this.handleChange(e)}
							className="roundInput x"
              placeholder="username"
						/>
						<br />
						<label>Email</label>
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={(e) => this.handleChange(e)}
							className="roundInput y"
              placeholder="email"
						/>
						<br />
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={(e) => this.handleChange(e)}
							className="roundInput z"
              placeholder="password"
						/>
						<br />
						<button className="buttonz xyz">Signup</button>
            <p className="noAccount">Already have an account? <Link to="/login" className="whiteLink">Login</Link></p>
					</form>
				</div>
			</div>
		);
	}
}
export default Signup;
