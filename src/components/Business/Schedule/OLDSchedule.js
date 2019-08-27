import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getBusinessAppointmentsByDate } from '../../../actions/appointmentsAction';
import { getBusinessByOwner } from '../../../actions/businessActions';
import { getCurrentDate, getDay, getTimeDifference, getTime, getWorkDay } from '../../../utils/date';

// import '../Business.css';
import './Schedule.css';

import axios from 'axios';
import { API } from '../../../consts';
import TimeLine from './OldTimeLine';

import { FaPaperPlane } from 'react-icons/fa';

class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false,
			loading: false,
			business_id: '',
			appointments: [],
			/* TimeLine */
			date: '',
			day: '',
			working: {}
		};
		this.pickDate = this.pickDate.bind(this);
	}
	componentDidMount() {
		this.props.getBusinessByOwner(this.props.auth.user.sub);
		const id = this.props.match.params.id;
		const date = getCurrentDate('-');
		const day = getDay(date);

		this.setState({ business_id: id, date: date, day: day, loading: true });
		this.props.getBusinessAppointmentsByDate(id, date).then((res) => {
			this.setState({ loading: false });
		});
	}

	pickDate = (date) => {
		this.setState({ date, day: getDay(date) });
		this.props.getBusinessAppointmentsByDate(this.state.business_id, date);
	};

	render() {
		const { myBusiness } = this.props;
		var opened = true;
		var working;
		if (!isEmpty(myBusiness)) {
			working = getWorkDay(myBusiness.profile.working_hours, this.state.day);
			if (!isEmpty(working)) {
				opened = working.opened;
			} else {
				opened = false;
			}
		}

		return (
			<section key={'StatisticsHeader'}>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-3 mb-4">
							<div className="card border-left-primary shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-4">
							<div className="card border-left-success shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-4">
							<div className="card border-left-info shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-4">
							<div className="card border-left-warning shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{!this.state.loading ? (
						<section>
							<NavLink to="/business/mySchedule/new-appointment" className="btn btn-sm btn-success">
								new appointment
							</NavLink>
							<TimeLine
								working={working}
								date={this.state.date}
								opened={opened}
								pickDate={this.pickDate}
							/>
						</section>
					) : (
						<div className="mx-auto spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					)}
				</div>
			</section>
		);
	}
}
Schedule.propTypes = {
	myBusiness: PropTypes.object.isRequired,
	customers: PropTypes.array.isRequired,
	getBusinessAppointmentsByDate: PropTypes.func.isRequired,
	getBusinessByOwner: PropTypes.func.isRequired
	// services: PropTypes.array.isRequired
};
Schedule.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	myBusiness: state.business.myBusiness,
	customers: state.business.customers
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, { getBusinessAppointmentsByDate, getBusinessByOwner })(Schedule);
