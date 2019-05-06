import React, { Component } from 'react';
import Upcomming from './Upcomming';
import StatsPanel from './StatsPanel';

export class ClientDashboard extends Component {
	render() {
		return (
			<div className="col-12">
				<StatsPanel />
				<Upcomming />
			</div>
		);
	}
}

export default ClientDashboard;
