import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { setFlashMessage } from '../../../actions/flashMessageActions';

/* UTILS */
import { getBusinessTime, getAppointmentTime, objectTimeToString } from '../../../utils/date';
import { appointmentCheck } from '../../../actions/appointmentsAction';
import AppointmentModal from './AppointmentModal';
import moment from 'moment';
import Loading from '../../globalComponents/Loading';
import { GiConsoleController } from 'react-icons/gi';

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
		this.appointmentCheck = this.appointmentCheck.bind(this);

		// this.setNewAppointment = this.setNewAppointment.bind(this);
	}
	appointmentCheck(appointment, action) {
		var timeNow = moment();
		let data = {
			appointment_id : appointment._id,
			action,
			client_id      : appointment.client_id._id,
			business_id    : appointment.business_id,
			time           : timeNow
		};

		if (action === 'in') {
			let appointment_time = moment(appointment.date).set({
				hour   : appointment.time.start._hour,
				minute : appointment.time.start._minute
			});
			/* check the difference between check_in time and the real time */
			let difference = moment.duration(appointment_time.diff(timeNow)).asMinutes();
			console.log(difference);

			if (difference <= -15) {
				data['isLate'] = { late: true, minutes: difference };

				this.props.setFlashMessage({
					type   : 'warning',
					text   : `${appointment.client_id.profile.name.first} ${difference} Minutes Late!
					Set this appointment as late?`,
					action : {
						CancelButton : true,
						cancelText   : 'NO',
						confirmText  : 'LATE CHECK IN',
						next         : 'LATE_CHECK_IN',
						data
					}
				});
				return;

				//Show a message for the business
			} else if (difference > 15) {
				data['isLate'] = { late: '', minutes: 0 };
			} else {
				data['isLate'] = { late: 'false', minutes: 0 };
			}
		} else {
			/* THE CHECK OUT SECTION */
			/* CHECK FOR THE NEXT BUSINESS TIME , IF IT IN THE RANGE OF LATENESS */
			let end_time = moment(appointment.date).set({
				hour   : appointment.time.end._hour,
				minute : appointment.time.end._minute
			});
			/* check the difference between check_in time and the real time */
			let difference = moment.duration(end_time.diff(timeNow)).asMinutes();
			/* making sure that this will not harm the next appointment */
			if (this.props.appointment.upComing[2]) {
				let next = this.props.appointment.upComing[2];
				let time = moment()
					.set({ hour: next.time.start._hour, minute: next.time.start._minute })
					.add(difference, 'minutes');
			}
			// if (difference)
			data['isLate'] = { late: 'false', minutes: 0 };
		}
		this.props.appointmentCheck(data);
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
					appointmentCheck={this.appointmentCheck}
				/>
				<div className="container">
					{!this.props.loading ? (
						<div className="row">
							<div className="col-12 bg-white shadow-sm calendar-content pt-md-3">
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
					) : (
						<Loading />
					)}
				</div>
			</section>
		);
	}
}
TimeLine.propTypes = {
	auth             : PropTypes.object.isRequired,
	myBusiness       : PropTypes.object.isRequired,
	appointment      : PropTypes.object.isRequired,
	freeTime         : PropTypes.object.isRequired,
	appointmentCheck : PropTypes.func.isRequired,
	setFlashMessage  : PropTypes.func.isRequired
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
	freeTime    : state.appointment.freeTime,
	loading     : state.appointment.loading

	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, { appointmentCheck, setFlashMessage })(TimeLine);
