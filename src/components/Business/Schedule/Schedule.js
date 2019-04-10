import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false
		};
	}
	componentDidMount() {}
	render() {
		return (
			<section className="my-5">
				<div className="container">
					<NavLink to="/business/mySchedule/new-appointment" className="btn btn-sm btn-success">
						new appointment
					</NavLink>
				</div>
			</section>
		);
	}
}
