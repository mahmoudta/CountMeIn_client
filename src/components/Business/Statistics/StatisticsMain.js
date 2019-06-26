import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Overview from './Overview';
import ServicesStatsMain from './ServicesStatsMain';
import AppointmentsStatsMain from './AppointmentsStatsMain';
import FollowersStatsMain from './FollowersStatsMain';
import {
	getSumarryPage,
	getAppointmentStats,
	getServicesStats,
	getFollowersStats
} from '../../../actions/StatisticsActions';

class StatisticsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			range : 7,
			nav   : 'overview',
			title : 'Business Summary'
		};
		this.renderPage = this.renderPage.bind(this);
		this.changePage = this.changePage.bind(this);
	}
	componentDidMount() {
		this.props.getSumarryPage(this.props.user.business_id, this.state.range);
	}
	changePage = (nav) => {
		let title = '';
		switch (nav) {
			case 'appointments':
				title = 'Statistics Related to Appointments';
				this.props.getAppointmentStats(this.props.user.business_id);
				break;
			case 'followers':
				title = 'Followers Statistics';
				this.props.getFollowersStats(this.props.user.business_id);
				break;
			case 'services':
				title = 'Statistics Related to Services';
				this.props.getServicesStats(this.props.user.business_id);
				break;
			default:
				title = 'Business Summary';
				this.props.getSumarryPage(this.props.user.business_id, this.state.range);
				break;
		}
		this.setState({ nav, title });
	};
	renderPage = () => {
		const { nav } = this.state;
		switch (nav) {
			case 'appointments':
				return <AppointmentsStatsMain />;
			case 'followers':
				return <FollowersStatsMain />;
			case 'services':
				return <ServicesStatsMain />;

			default:
				return <Overview />;
		}
	};

	render() {
		return (
			<section className="my-5">
				<div className="container">
					<ul className="row nav nav-tabs">
						<li className="nav-item">
							<NavLink
								to="#"
								className={`nav-link text-uppercase  ${this.state.nav === 'overview' ? 'active' : ''}`}
								onClick={(e) => {
									e.preventDefault();
									this.changePage('overview');
								}}
							>
								Overview
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="#"
								className={`nav-link text-uppercase  ${this.state.nav === 'appointments'
									? 'active'
									: ''}`}
								onClick={(e) => {
									e.preventDefault();

									this.changePage('appointments');
								}}
							>
								Appointments
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="#"
								className={`nav-link text-uppercase  ${this.state.nav === 'followers' ? 'active' : ''}`}
								onClick={(e) => {
									e.preventDefault();

									this.changePage('followers');
								}}
							>
								Followers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="?section=services"
								className={`nav-link text-uppercase ${this.state.nav === 'services' ? 'active' : ''}`}
								onClick={(e) => {
									e.preventDefault();
									this.changePage('services');
								}}
							>
								Services
							</NavLink>
						</li>
					</ul>
					<div className="row d-flex bg-white p-3 align-items-baseline ">
						<h6 className=" mt-3 text-uppercase">{this.state.title}</h6>
						<form action="">
							<select className="form-control form-control-sm mx-4" name="range">
								<option defaultChecked>last 7 days</option>
								<option>last 28 days</option>
							</select>
						</form>
					</div>
					<div className="row bg-white border-top border-bottom">
						<div className="col-lg-7 py-2">
							<small className="d-block font-weight-bold">{`${moment().format('DD MMM')}`}</small>
							<small className="text-muted">
								<strong>Note:</strong> Does not include today's data. Insights activity is reported in
								the Pacific time zone. Ads activity is reported in the time zone of your ad account.
							</small>
						</div>
					</div>
					{this.renderPage()}
				</div>
			</section>
		);
	}
}

StatisticsMain.propTypes = {
	user                : PropTypes.object.isRequired,
	getSumarryPage      : PropTypes.func.isRequired,
	getAppointmentStats : PropTypes.func.isRequired,
	getServicesStats    : PropTypes.func.isRequired,
	getFollowersStats   : PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	user : state.auth.user
});

export default connect(mapStatetoProps, { getSumarryPage, getAppointmentStats, getServicesStats, getFollowersStats })(
	StatisticsMain
);
