import React, { Component } from 'react';
import './landing.css';

import LoginForm from './LoginForm';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<section className="landing">
				<LoginForm />
			</section>
		);
	}
}
export default Landing;
