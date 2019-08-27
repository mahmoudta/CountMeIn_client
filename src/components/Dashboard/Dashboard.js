import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AdminDashboard from './AdminView/AdminDashboard';
import ClientDashboard from './ClientView/ClientDashboard';

class Dashboard extends Component {
	render() {
		// return <section className="my-5">{this.renderView()}</section>;

		return (
			<section className="my-5">
				{this.props.auth.user.isAdmin ? <AdminDashboard /> : <ClientDashboard />};
			</section>
		);
		// return this.props.auth.user.isAdmin ? <AdminDashboard /> : <ClientDashboard />;
	}
}

Dashboard.propTypes = {
	auth : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth : state.auth
});
export default connect(mapStatetoProps)(Dashboard);
