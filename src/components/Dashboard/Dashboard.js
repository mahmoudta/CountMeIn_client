import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AdminDashboard from './AdminView/AdminDashboard';
import ClientDashboard from './ClientView/ClientDashboard';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userType: ''
		};
		this.renderView = this.renderView.bind(this);
	}
	renderView = () => {
		if (this.state.userType === 'admin') {
			return <AdminDashboard />;
		} else {
			return <ClientDashboard />;
		}
	};
	componentDidMount = () => {
		const { isAdmin } = this.props.auth.user;
		var userType = '';
		if (isAdmin) {
			userType = 'admin';
		} else {
			userType = 'customer';
		}
		this.setState({ userType });
	};

	render() {
		return <section className="my-5">{this.renderView()}</section>;
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth
});
export default connect(mapStatetoProps)(Dashboard);
