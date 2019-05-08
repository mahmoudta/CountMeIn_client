import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

// import { getBusinessAppointmentsByDate } from '../../../actions/appointmentsAction';
//icons
import { FaCalendarAlt } from 'react-icons/fa';

import { getCurrentDate, getDay, getTimeDifference, getTime } from '../../../utils/date';

class TimeLine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: '',
			day: ''
		};
		this.pickDate = this.pickDate.bind(this);
	}

	componentDidMount() {
		// const date = getCurrentDate('-');
		// const day = getDay(date);
		// this.setState({ date, day });
	}

	pickDate = (e) => {
		const { business_id } = this.props;
		this.setState({ date: e.target.value, day: getDay(e.target.value) });
		// this.appointmentsRequest(business_id, e.target.value);
	};
	eachAppointment = (element) => {
		const { appointment, user } = element;

		return (
			<div key={appointment._id} className="event">
				<span className="d-block text-center">{`${user.profile.name.first} ${user.profile.name.last}`}</span>
				<hr />
				<span className="d-block text-center">{`${appointment.time.start._hour}:${Number(
					appointment.time.start._minute
				) < 10
					? `0${appointment.time.start._minute}`
					: appointment.time.start._minute._minute}
					-${appointment.time.end._hour}:${Number(appointment.time.end._minute) < 10
					? `0${appointment.time.end._minute}`
					: appointment.time.end._minute}`}</span>

				{/* <span className="d-block text-center">haircut</span> */}
			</div>
		);
	};

	switchTimeLineStatus = (opened, appointments) => {
		if (!opened) return <p className="text-center w-100 display-4 text-danger">STORE CLOSED</p>;
		if (!isEmpty(appointments)) {
			return appointments.map(this.eachAppointment);
		}
		return <p className="text-center w-100 display-4 ">NO APPOINTMENTS</p>;
	};
	// getTimeLineHeader
	render() {
		const { appointments, opened, working } = this.props;
		var start, time;
		if (!isEmpty(working)) {
			start = getTime(working.from);
			time = getTimeDifference(working.from, working.until);
		}
		console.log(start);

		return (
			<div className="timeLine card">
				<div className="card-header">
					<h3 className="card-title text-uppercase">Appointments Timeline</h3>
					<div className="card-options">
						<form action="">
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<FaCalendarAlt />
									</span>
								</div>
								<input
									type="date"
									value={this.props.date}
									onChange={(e) => this.props.pickDate(e.target.value)}
									className="form-control"
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="card-body">
					<div className="timeLine-header d-flex flex-column flex-md-row justify-content-between">
						<span>time</span>
					</div>
					<div className="timeLine-events d-flex flex-column flex-md-row">
						{!this.props.appointmentsLoading ? (
							this.switchTimeLineStatus(opened, appointments)
						) : (
							<div className="mx-auto spinner-border" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

TimeLine.propTypes = {
	myBusiness: PropTypes.object.isRequired,
	appointments: PropTypes.array.isRequired
	// getBusinessAppointmentsByDate: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	myBusiness: state.business.myBusiness,
	appointmentsLoading: state.appointment.loading,
	appointments: state.appointment.appointments
});
export default connect(mapStatetoProps, {})(TimeLine);
