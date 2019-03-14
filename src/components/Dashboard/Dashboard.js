import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<section className="my-5">
				<AdminDashboard />
			</section>
		);
	}
}

export default Dashboard;
