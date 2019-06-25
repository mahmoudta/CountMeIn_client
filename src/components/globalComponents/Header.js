import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { logout } from '../../actions/authActions';

import { FaSignOutAlt, FaBell } from 'react-icons/fa';
import logo from '../../images/logo.png';
// import appointmentReducer from '../../reducers/appointmentReducer';

// import './global.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open : false
		};
		this.renderHeader = this.renderHeader.bind(this);
		// this.openDropdown = this.openDropdown.bind(this);
		// this.closeDropdown = this.closeDropdown.bind(this);
	}
	// openDropdown = (e) => {
	// 	e.preventDefault();
	// 	// const { open } = this.state;
	// 	this.setState({ open: true }, () => {
	// 		document.addEventListener('click', this.closeDropdown);
	// 	});
	// };

	// closeDropdown = (e) => {
	// 	e.preventDefault();
	// 	// const { open } = this.state;
	// 	this.setState({ open: false }, () => {
	// 		document.removeEventListener('click', this.closeDropdown);
	// 	});
	// };

	logOut = (e) => {
		e.preventDefault();
		this.props.logout();
	};

	componentDidMount() {}
	renderHeader = () => {
		return (
			<header className="navbar p-0">
				<div className="container-fluid">
					<div className="header-logo">
						<NavLink className="navbar-brand" to="/dashboard">
							<img src={logo} alt="" />
						</NavLink>
					</div>

					<ul className="nav ml-md-auto nav-user">
						<li className="dropdown">
							<a role="button" className="dropdown-toggle" data-toggle="dropdown">
								<FaBell />
							</a>
							<ul className="dropdown-menu notifications-menu ">
								<li className=" text-white arrow top" />
								<h6 className="dropdown-header text-center">Notifications</h6>
								{this.props.notifications.map((notification) => {
									return (
										<li className="dropdown-item">
											<Link className="h6 font-weight-normal py-3" to="#">
												{notification.title}
											</Link>
										</li>
									);
								})}
								{/* <li className="dropdown-item">
									<p className="text-muted w-100 text-center">No notifications</p>
								</li> */}
							</ul>
						</li>

						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">
								<span className="thumb-sm avatar float-left">
									<img
										src="https://crm.megatam.net/resource/avatar/download.png"
										className="rounded-circle"
									/>
								</span>
								{this.props.user.profile.name.first + this.props.user.profile.name.last}{' '}
								<b className="caret" />
							</a>
							<ul className="dropdown-menu animated fadeInRight">
								<li className=" text-white arrow top" />
								<li className="dropdown-item">
									<a href="#">Settings</a>
								</li>
								<li className="dropdown-divider" />
								<li className="dropdown-item">
									<Link to="#" onClick={this.logOut}>
										<FaSignOutAlt /> Log Out
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</header>
		);
	};

	render() {
		return <div> {this.props.auth.isAuthenticated ? this.renderHeader() : ''}</div>;
	}
}
Header.propTypes = {
	auth          : PropTypes.object.isRequired,
	logout        : PropTypes.func.isRequired,
	notifications : PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	auth          : state.auth,
	user          : state.auth.user,
	notifications : state.auth.notifications
});
export default connect(mapStatetoProps, { logout })(Header);
