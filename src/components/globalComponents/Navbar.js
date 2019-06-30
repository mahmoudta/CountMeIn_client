import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

// import './global.css';
import { FaArrowLeft, FaBriefcase, FaCalendarAlt, FaAddressCard, FaPalette } from 'react-icons/fa';

import { MdDashboard, MdSearch } from 'react-icons/md';
import { FaBell, FaChartBar, FaStickyNote, FaBars } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

import isEmpty from 'lodash/isEmpty';

// import { getBusinessByOwner, getBusinessCustomers, getBusinessServices } from '../../actions/businessActions';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width       : 'aside-md',
			loading     : false,
			business_id : '',
			dropMenu    : true
		};
		this.renderNav = this.renderNav.bind(this);
		this.menuToggler = this.menuToggler.bind(this);
		this.openAsideDropDown = this.openAsideDropDown.bind(this);
	}
	menuToggler = (e) => {
		const { width } = this.state;
		if (width === 'aside-md') {
			this.setState({ width: 'nav-xs' });
		} else {
			this.setState({ width: 'aside-md' });
		}
	};
	openAsideDropDown = (e) => {
		e.preventDefault();
		const { dropMenu } = this.state;
		this.setState({ dropMenu: !dropMenu });
	};
	componentDidMount() {}

	renderNav = () => {
		const { user } = this.props.auth;
		return (
			<div>
				<aside>
					<ul className="list-unstyled mb-0 ">
						<li className="">
							<NavLink exact activeClassName={'active'} to="/dashboard">
								<MdDashboard className="icon" />

								<span>Dashboard</span>
							</NavLink>
						</li>
						<li className="">
							<NavLink to="/Search" activeClassName="active">
								<MdSearch className="icon" />

								<span>Search</span>
							</NavLink>
						</li>
						<li className="aside-dropdown">
							<NavLink
								exact
								to="#"
								className=" dropdown-toggle"
								activeclassname={'active'}
								role="button"
								onClick={this.openAsideDropDown}
							>
								<FaBriefcase className="icon" />
								<span>Businesses</span>
							</NavLink>

							<ul
								className={`list-unstyled flex-column aside-menu w-100 rounded-0 ${this.state.dropMenu
									? 'open'
									: ''}`}
							>
								{this.props.auth.user.isBusinessOwner ? (
									[
										<li
											key={`Schedule${this.props.auth.user.business_id}`}
											className=" text-uppercase text-truncate"
										>
											<NavLink exact to={'/business/pages/mySchedule'} activeclassname={'active'}>
												<FaCalendarAlt className="icon" /> <span>my schedule</span>
											</NavLink>
										</li>,
										<li
											key={`View${this.props.auth.user.business_id}`}
											className="text-uppercase text-truncate"
										>
											<NavLink
												exact
												to={'/business/view/' + this.props.auth.user.business_id}
												activeclassname={'active'}
											>
												<FaPalette className="icon" /> <span>Page View</span>
											</NavLink>
										</li>,
										<li
											key={`Smart${this.props.auth.user.business_id}`}
											className=" text-uppercase text-truncate"
											activeclassname={'active'}
										>
											<NavLink
												exact
												to="/business/advanced/smart-algorithms-settings"
												activeclassname="active"
											>
												<GiBrain className="icon" /> <span>smart settings</span>
											</NavLink>
										</li>,
										<li
											key={`Report${this.props.auth.user.business_id}`}
											className="text-uppercase text-truncate"
										>
											<NavLink exact to="/insights" activeclassname={'active'}>
												<FaChartBar className="icon" /> <span>insights</span>
											</NavLink>
										</li>
									]
								) : (
									<li className="nav-item text-uppercase text-truncate">
										<NavLink exact to="/business/pages/create" activeclassname={'active'}>
											<FaAddressCard className="icon" /> <span>Create</span>
										</NavLink>
									</li>
								)}
							</ul>
						</li>
						<li className="">
							<NavLink exact to="/appointments-review" activeclassname={'active'}>
								<FaStickyNote className="icon" />
								<span>Reviews</span>
							</NavLink>
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
			<div
				id="sidebar"
				className={`${this.state.width} nav-off-screen ${!this.props.auth.isAuthenticated ? 'd-none' : ''}`}
			>
				{this.props.auth.isAuthenticated ? this.renderNav() : ''}
			</div>
		);
	}
}

Navbar.propTypes = {
	auth : PropTypes.object.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
	// getBusinessServices: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth : state.auth
	// myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, {}, null, { pure: false })(withRouter(Navbar));
