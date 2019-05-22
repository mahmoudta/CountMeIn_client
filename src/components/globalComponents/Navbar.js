import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import './global.css';
import { FaArrowLeft, FaBriefcase, FaCalendarAlt, FaAddressCard, FaPalette } from 'react-icons/fa';

import { MdDashboard } from 'react-icons/md';
import isEmpty from 'lodash/isEmpty';

import { getBusinessByOwner, getBusinessCustomers, getBusinessServices } from '../../actions/businessActions';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 'aside-md',
			loading: false,
			business_id: ''
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
	componentDidMount() {
		// const id = this.props.auth.user.sub;
		// this.props.getBusinessByOwner(id);
		// .then((result) => {
		// 	if (!result.payload.error) {
		// 		this.setState({ business_id: result.payload._id });
		// 		this.props.getBusinessCustomers();
		// 		this.props.getBusinessServices(result.payload._id);
		// 	}
		// });
	}
	businessDropDown = () => {};
	renderNav = () => {
		const { user } = this.props.auth;
		console.log(user);
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
							<NavLink to="/businesses" activeClassName="active" role="button">
								<FaBriefcase className="icon" />
								<span>Businesses</span>
							</NavLink>

							<ul className="nav flex-column">
								{this.props.auth.user.isBusinessOwner ? (
									[
										<li
											key={`Schedule${this.props.auth.user.business_id}`}
											className="nav-item text-uppercase"
										>
											<NavLink
												to={'/business/pages/mySchedule/' + this.props.auth.user.business_id}
											>
												<FaCalendarAlt /> my schedule
											</NavLink>
										</li>,
										<li
											key={`View${this.props.auth.user.business_id}`}
											className="nav-item text-uppercase"
										>
											<NavLink to={'/business/view/' + this.props.auth.user.business_id}>
												<FaPalette /> Page View
											</NavLink>
										</li>
									]
								) : (
									<li className="nav-item text-uppercase">
										<NavLink to="/business/pages/create">
											<FaAddressCard /> Create
										</NavLink>
									</li>
								)}
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
		// const { _id } = this.props.myBusiness;
		// console.log(_id);
		return (
			<div
				id="sidebar"
				className={this.state.width}
				style={{
					display: this.props.auth.isAuthenticated ? 'table-cell' : 'none'
				}}
			>
				{this.props.auth.isAuthenticated ? this.renderNav() : ''}
			</div>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
	// getBusinessServices: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth
	// myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, {})(Navbar);
