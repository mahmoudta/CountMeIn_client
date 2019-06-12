import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import isEmpty from 'lodash/isEmpty';

/* COMPONENTS */
import StatsticsScheduleHeader from './StatsticsScheduleHeader';
import TimeLine from './TimeLine';

/* UTILS */
import { getCurrentDate } from '../../../utils/date';
import {
	getBusinessAppointmentsByDate,
	getFreeTime,
	businessNewAppointment
} from '../../../actions/appointmentsAction';
import { getBusinessByOwner } from '../../../actions/businessActions';
import { getStatisticsHeader } from '../../../actions/StatisticsActions';

import { FaAngleDown } from 'react-icons/fa';
import moment from 'moment';

/* STYLES */
import './Schedule.css';
import UpComing from './UpComing';

class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateNow        : getCurrentDate(),
			date           : '',

			services       : [],
			customer       : '',
			newAppointment : false
		};
		this.changeDate = this.changeDate.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleFreeTime = this.handleFreeTime.bind(this);
		this.newAppointment = this.newAppointment.bind(this);
	}

	appointmentCheckIn;
	handleFreeTime(e) {
		e.preventDefault();
		const valid = moment().format('YYYY-MM-DD') <= moment(this.state.date).format('YYYY-MM-DD');

		if (!valid) return;

		const services = this.state.services.map((service) => {
			return service.value;
		});

		this.props.getFreeTime({
			business    : this.props.myBusiness._id,
			services    : services,
			date_from   : this.state.date,
			date_until  : this.state.date,
			customer_id : this.state.customer.value
		});
	}

	componentDidMount() {
		const { dateNow } = this.state;
		const { user } = this.props.auth;
		this.props.getBusinessByOwner(user.sub);
		this.props.getBusinessAppointmentsByDate(user.business_id, dateNow);
		this.props.getStatisticsHeader(user.business_id);
		this.setState({ date: dateNow });
	}
	handleSelectChange(value, action) {
		const name = action.name;

		this.setState({ [name]: value });
	}
	changeDate(e) {
		const { name, value } = e.target;
		const { user } = this.props.auth;
		const { date } = this.state;
		if (value !== date) {
			this.props.getBusinessAppointmentsByDate(user.business_id, value);
			this.setState({ [name]: value });
		}
	}
	newAppointment(date, _start, _end) {
		let data = {
			client_id   : this.state.customer.value,
			business_id : this.props.myBusiness._id,
			services    : this.state.services,
			date,
			_start,
			_end
		};
		this.props.businessNewAppointment(data);
	}
	render() {
		const { myBusiness } = this.props;

		return (
			<section key={'mainSchedule'} className="my-5">
				<StatsticsScheduleHeader />
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-8">
							<UpComing />
						</div>

						<div className="col-12 col-lg-4">
							<div className="card border-0 shadow-sm">
								<div className="card-header bg-primary">
									<h6 className="card-title">New Appointment</h6>
									<div className="card-options">
										<button
											className="btn btn-primary border-0"
											onClick={() => {
												this.setState({ newAppointment: !this.state.newAppointment });
											}}
										>
											<FaAngleDown />
										</button>
									</div>
								</div>
								<div className={`card-body closed ${this.state.newAppointment ? 'opened' : ''} `}>
									<form>
										<div className="row">
											<div className="col-12">
												<div className="form-group">
													<label className="form-label">Services</label>
													<Select
														options={
															!isEmpty(myBusiness) ? (
																myBusiness.services.map((service) => {
																	return {
																		value : service.service_id._id,
																		label : service.service_id.title
																	};
																})
															) : (
																[]
															)
														}
														name="services"
														isMulti
														value={this.state.services}
														components={makeAnimated()}
														onChange={this.handleSelectChange}
													/>
												</div>
											</div>
											<div className="col-12">
												<div className="form-group">
													<label className="form-label">Customer</label>
													<Select
														options={
															!isEmpty(myBusiness) ? (
																myBusiness.customers.map((customer) => {
																	return {
																		value : customer.customer_id._id,
																		label : `${customer.customer_id.profile.name
																			.first}`
																	};
																})
															) : (
																[]
															)
														}
														name="customer"
														value={this.state.customer}
														components={makeAnimated()}
														onChange={this.handleSelectChange}
													/>
												</div>
											</div>
											<div className="col-8 mx-auto col-lg-12">
												<button className="btn btn-primary w-100" onClick={this.handleFreeTime}>
													Search free time
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<TimeLine
					date={this.state.date}
					changeDate={this.changeDate}
					newAppointment={this.newAppointment}
					handleNewAppointmentForm={this.state.handleNewAppointmentForm}
				/>
			</section>
		);
	}
}

Schedule.propTypes = {
	auth                          : PropTypes.object.isRequired,
	getBusinessByOwner            : PropTypes.func.isRequired,
	myBusiness                    : PropTypes.object.isRequired,
	getFreeTime                   : PropTypes.func.isRequired,
	businessNewAppointment        : PropTypes.func.isRequired,
	// services: PropTypes.array.isRequired,
	getBusinessAppointmentsByDate : PropTypes.func.isRequired,
	getStatisticsHeader           : PropTypes.func.isRequired
};
Schedule.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth       : state.auth,
	myBusiness : state.business.myBusiness
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, {
	getBusinessAppointmentsByDate,
	getBusinessByOwner,
	getFreeTime,
	businessNewAppointment,
	getStatisticsHeader
})(Schedule);
