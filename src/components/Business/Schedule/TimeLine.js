import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

/* UTILS */
import { getBusinessTime, appointmentTimeDiffrence } from '../../../utils/date';

class TimeLine extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { appointment, myBusiness, date } = this.props;
		let times = [];
		let startTime = 0;
		let date1 = new Date();
		let date2 = new Date();
		if (!isEmpty(myBusiness)) {
			times = getBusinessTime(myBusiness.profile.working_hours, date);
			if (!isEmpty(times)) {
				startTime = Number(times[0].split(':')[0]);
			}
		}

		return (
			<section key={'TimleLine'}>
				<div className="container">
					<div className="col-12 bg-white shadow-sm calendar-content pt-md-3">
						<div className="col-12 claendar-Tools clear-fix my-2">
							<Link to="/business/mySchedule/new-appointment" className="btn btn-primary btn-sm">
								New Appointment
							</Link>
						</div>
						<div className="col-12 calendar-header">
							<div className="row">
								<div className="col-12 col-md-4">
									<form>
										<div className="form-row">
											<input
												className="form-control form-control-sm"
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
						<div className="col-12 calendar-body border-top mt-5 p-md-0">
							<div className="calendar-content ">
								{!appointment.loading ? (
									appointment.appointments.map((appointment) => {
										return (
											<div
												key={appointment._id}
												className="appointment-event bg-primary text-white rounded shadow"
												style={{
													height:
														Number(
															appointment.time.end._hour -
																appointment.time.start._hour +
																'.' +
																(appointment.time.end._minute -
																	appointment.time.start._minute)
														) *
															100 -
														10 +
														'px',

													top:
														(Number(
															`${appointment.time.start._hour}.${Number(
																appointment.time.start._minute
															) / 60}`
														) -
															startTime) *
															60 +
														'px'
												}}
											>
												<h4>{appointment.client.profile.name.first}</h4>
											</div>
										);
									})
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
	auth: PropTypes.object.isRequired,
	myBusiness: PropTypes.object.isRequired,
	appointment: PropTypes.object.isRequired
	// customers: PropTypes.array.isRequired,
	// services: PropTypes.array.isRequired,
};
TimeLine.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	myBusiness: state.business.myBusiness,
	appointment: state.appointment
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, {})(TimeLine);
