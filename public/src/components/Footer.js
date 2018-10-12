import React, { Component } from 'react';
import '../App.css';

class Footer extends Component {
	render() {
		return (
			<div className="Footer">
				<footer>
					<div className="copyright">
						<p>© 2018 CoDrop, Inc. All Rights Reserved</p>
					</div>
					<div className="terms">
						<p>
							<a href="" className="term">
								Terms of Use
							</a>
							<a href="" className="policy">
								CoDrop Privacy Policy
							</a>
							<a href="" className="act">
								CA Supply Chains Act
							</a>
						</p>
					</div>
				</footer>
			</div>
		);
	}
}
export default Footer;
