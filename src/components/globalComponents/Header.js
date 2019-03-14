import React, { Component } from 'react';
import './global.css';
import logo from '../../images/logo.png';

class Header extends Component {
	render() {
		return (
			<header className="p-3">
				{/* <div className="container-fluid">
					<div className="row">
						<div className=" col-md-4">
							<img className="logo" src={logo} alt="CountMeIn_Logo" />
						</div>
					</div>
				</div> */}
			</header>
		);
	}
}

export default Header;
