import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

/* UTILS */
import { getBusinessTime, getAppointmentTime, objectTimeToString } from '../../../utils/date';
import AppointmentModal from './AppointmentModal';
import moment from 'moment';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointmentClicked : false,
			appointment        : {}
		};
		this.eachAppointment = this.eachAppointment.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// this.setNewAppointment = this.setNewAppointment.bind(this);
	}

	closeModal = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ appointmentClicked: false });
	};
	openModal = (e, appointment) => {
		if (e) {
			e.preventDefault();
		}

		this.setState({ appointmentClicked: true, appointment });
	};

	eachAppointmentSuggest(suggest, startTime, break_time) {
		let date1 = new Date();
		date1.setHours(suggest._end._hour, suggest._end._minute - break_time, 0, 0);
		const height = getAppointmentTime(suggest._start, suggest._end) - Math.round(break_time);
		const top = getAppointmentTime({ _hour: startTime, _minute: 0 }, suggest._start);

		return (
			<div
				key={top}
				className={`d-flex justify-content-center align-items-center appointment-event shadow-sm bg-warning `}
				style={{
					height : height * 2 + 'px',
					top    : top * 2 + 'px'
				}}
			>
				<span>
					{objectTimeToString(suggest._start, { _hour: date1.getHours(), _minute: date1.getMinutes() })}
				</span>
				<button
					className="btn btn-sm btn-secondary ml-auto"
					onClick={(e) => {
						e.preventDefault();
						this.props.newAppointment(this.props.freeTime['Date'], suggest._start, suggest._end);
					}}
				>
					set appointment
				</button>
			</div>
		);
	}

	eachAppointment(appointment, startTime, break_time) {
		let date1 = new Date();
		let date2 = new Date();
		// date1.setHours()
		const height = getAppointmentTime(appointment.time.start, appointment.time.end) - Math.round(break_time);
		const top = getAppointmentTime({ _hour: startTime, _minute: 0 }, appointment.time.start);

		return (
			<div
				key={appointment._id}
				className={`d-flex justify-content-center align-items-center appointment-event shadow-sm ${appointment.status}`}
				onClick={(e) => this.openModal(e, appointment)}
				style={{
					height : height * 2 + 'px',
					top    : top * 2 + 'px'
				}}
			>
				<span>{objectTimeToString(appointment.time.start, appointment.time.end)}</span>
			</div>
		);
	}
	render() {
		const { appointment, myBusiness, date, freeTime } = this.props;
		let times = [];
		let startTime = 0;
		let date1 = new Date();
		let date2 = new Date();
		if (!isEmpty(myBusiness)) {
			times = getBusinessTime(myBusiness.working_hours, date);
			if (!isEmpty(times)) {
				startTime = Number(times[0].split(':')[0]);
			}
		}

		return (
			<section key={'TimleLine'}>
				<AppointmentModal
					closeModal={this.closeModal}
					show={this.state.appointmentClicked}
					appointment={this.state.appointment}
					myBusiness={myBusiness}
				/>
				<div className="container">
					<div className="col-12 bg-white shadow-sm calendar-content pt-md-3">
						{/* <div className="col-12 claendar-Tools clear-fix my-2">
							<Link
								to="/business/mySchedule/new-appointment"
								props={this.props.handleNewAppointmentForm}
								className="btn btn-primary btn-sm"
							>
								New Appointment
							</Link>
						</div> */}
						<div className="col-12 calendar-header">
							<div className="row">
								<div className="col-12 col-md-4 mx-auto">
									<form>
										<div className="form-group">
											<label
												className="w-100 text-capitalize text-center text-secondary h2 font-weight-light"
												htmlFor="date"
											>
												{new Date(date).toLocaleDateString('en-US', options)}
											</label>
											<input
												className="w-md-75 mx-md-auto form-control form-control-sm"
												type="date"
												name="date"
												value={date}
												onChange={(e) => this.props.changeDate(e)}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-12 calendar-body border-top mt-3 p-md-0">
							<div className="calendar-content ">
								{!isEmpty(freeTime) ? (
									freeTime.Free.map((suggest) =>
										this.eachAppointmentSuggest(suggest, startTime, myBusiness.break_time)
									)
								) : (
									''
								)}
								{!appointment.loading ? (
									appointment.appointments.map((appointment) =>
										this.eachAppointment(appointment, startTime, myBusiness.break_time)
									)
								) : (
									<div
										className="spinner-border text-primary"
										style={{ height: '20px', width: '20px' }}
										role="status"
									>
										<span className="sr-only">Loading...</span>
									</div>
								)}

								{!isEmpty(times) ? (
									times.map((time) => {
										return (
											<div key={time} className="d-flex">
												<div className="calendar-time ">
													<p key={`time:${time}`} className="timeSlot-group m-0">
														{time}
													</p>
												</div>
												<div className="event-space flex-grow-1 border-bottom" />
											</div>
										);
									})
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
TimeLine.propTypes = {
	auth        : PropTypes.object.isRequired,
	myBusiness  : PropTypes.object.isRequired,
	appointment : PropTypes.object.isRequired,
	freeTime    : PropTypes.object.isRequired
	// businessNewAppointment : PropTypes.func.isRequired
	// services: PropTypes.array.isRequired,
};
TimeLine.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth        : state.auth,
	myBusiness  : state.business.myBusiness,
	appointment : state.appointment,
	freeTime    : state.appointment.freeTime
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, {})(TimeLine);
