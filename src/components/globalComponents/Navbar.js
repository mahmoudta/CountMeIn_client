import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './global.css';
import { FaArrowLeft, FaBriefcase, FaCalendarAlt, FaAddressCard, FaPalette } from 'react-icons/fa';

import { MdDashboard } from 'react-icons/md';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 'aside-md'
		};
		this.renderNav = this.renderNav.bind(this);
		this.menuToggler = this.menuToggler.bind(this);
	}
	menuToggler = (e) => {
		const { width } = this.state;
		if (width === 'aside-md') {
			this.setState({ width: 'nav-xs' });
		} else {
			this.setState({ width: 'aside-md' });
		}
	};
	componentDidMount() {}
	renderNav = () => {
		return (
			<div>
				<aside className="">
					<ul className="list-unstyled mb-0">
						<li className="">
							<NavLink to="/dashboard" activeClassName="active">
								<MdDashboard className="icon" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li className="">
							<NavLink to="#" activeClassName="active">
								<FaBriefcase className="icon" />
								<span>Businesses</span>
							</NavLink>
							<ul className="nav flex-column">
								<li className="nav-item text-uppercase">
									<NavLink to="#">
										<FaCalendarAlt /> my schedule
									</NavLink>
								</li>
								<li className="nav-item text-uppercase">
									<NavLink to="`/Business/view`">
										<FaPalette /> Page View
									</NavLink>
								</li>
								<li className="nav-item text-uppercase">
									<NavLink to="/business/create">
										<FaAddressCard /> Create
									</NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</aside>
				<div className="nav-footer">
					<button
						className="btn bnt-custom menu-toggler"
						data-toggle="class:nav-xs"
						data-target="#sidebar"
						onClick={this.menuToggler}
					>
						<FaArrowLeft />
					</button>
				</div>
			</div>
		);
	};
	render() {
		return (
			<div id="sidebar" className={this.state.width}>
				{this.props.auth.isAuthenticated ? this.renderNav() : ''}
			</div>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth
});
export default connect(mapStatetoProps, {})(Navbar);
