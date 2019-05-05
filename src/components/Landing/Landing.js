import React, { Component } from 'react';
import './landing.css';

import logo from '../../images/logo.png';

import LoginForm from './LoginForm';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<section className="landing">
				<div className="container">
					<div className="row">
						<div className="col-12 shadow bg-white">
							<div className="row">
								<div className="col-5 bg-dark">
									<img src={logo} alt="" className="img-fluid" />
									<h2>title</h2>
								</div>
								<div className="col-7">
									<div className="row">
										<div className="col-6 py-5 px-2">
											<LoginForm />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
export default Landing;
