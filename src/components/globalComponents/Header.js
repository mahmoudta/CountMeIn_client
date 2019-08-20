import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { logout } from '../../actions/authActions';

import { FaSignOutAlt, FaBell, FaBars } from 'react-icons/fa';
import logo from '../../images/logo.png';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open      : false,
			navMobile : false
		};
		this.renderHeader = this.renderHeader.bind(this);
		this.openMobileNav = this.openMobileNav.bind(this);
	}

	logOut = (e) => {
		e.preventDefault();
		this.props.logout();
	};
	openMobileNav = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { navMobile } = this.state;
		this.setState({ navMobile: !navMobile });
	};

	renderHeader = () => {
		return (
			<header className={`navbar p-0 text-center`}>
				<div className="container-fluid">
					<button
						className="d-block d-md-none navbar-toggler text-white"
						type="button"
						onClick={this.openMobileNav}
					>
						<FaBars />
					</button>
					<div className="header-logo">
						<NavLink className="navbar-brand" to="/dashboard">
							<img src={logo} alt="" />
						</NavLink>
					</div>

					<ul className="nav ml-md-auto nav-user">
						<li className="dropdown d-none d-lg-block ">
							<a role="button" className="" data-toggle="dropdown">
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
								<span className="d-none d-lg-inline-block">
									{this.props.user.profile.name.first + this.props.user.profile.name.last}
									<b className="caret" />
								</span>
							</a>
							<ul className="dropdown-menu animated fadeInRight">
								<li className=" text-white arrow top" />
								{/* <li className="dropdown-item">
									<a href="#">Settings</a>
								</li> */}
								{/* <li className="dropdown-divider" /> */}
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
		return (
			<div className={`${this.state.navMobile ? 'mobileNavOpened' : ''}`}>
				{' '}
				{this.props.auth.isAuthenticated ? this.renderHeader() : ''}
			</div>
		);
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
