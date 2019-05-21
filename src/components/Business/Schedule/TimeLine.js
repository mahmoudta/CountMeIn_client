import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

// import { getBusinessAppointmentsByDate } from '../../../actions/appointmentsAction';
//icons
import { FaCalendarAlt } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

import {
	getCurrentDate,
	getDay,
	getTimeDifference,
	getTime,
	appointmentTimeDiffrence,
	getAppointmentTime
} from '../../../utils/date';

class TimeLine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: '',
			day: '',
			showTools: false
		};
		this.pickDate = this.pickDate.bind(this);
		this.handleGlobalClick = this.handleGlobalClick.bind(this);
	}

	componentDidMount() {
		document.body.addEventListener('click', this.handleGlobalClick);
	}
	componentWillUnmount() {
		document.body.removeEventListener('click', this.handleGlobalClick);
	}
	handleGlobalClick() {
		if (this.state.showTools) this.setState({ showTools: false });
	}

	pickDate = (e) => {
		const { business_id } = this.props;
		this.setState({ date: e.target.value, day: getDay(e.target.value) });
		// this.appointmentsRequest(business_id, e.target.value);
	};
	printHeader = (working, start, time) => {
		var header = [];
		const nTime = Math.ceil(time);
		for (let i = 0; i <= nTime; i++) {
			const number = Number(start.hour) + i;
			header.push(<span key={i + nTime}>{number < 10 ? `0${number}` : number}:00</span>);
		}
		return header;
	};
	eachAppointment = (element, time) => {
		const { appointment, user } = element;
		const diff = appointmentTimeDiffrence(appointment.time.start, appointment.time.end);
		return (
			<div
				key={appointment._id}
				className="event card bg-info text-white shadow"
				style={{
					width: Number(diff) / Number(time) * 100 + '%'
				}}
			>
				<div className="card-header">
					<h6 className="w-100 text-center mb-0">{`${user.profile.name.first} ${user.profile.name.last}`}</h6>
				</div>
				<div className="card-body">
					<p className="w-100 text-center mb-0 mt-3">
						{getAppointmentTime(appointment.time.start, appointment.time.end)}
					</p>
				</div>
				<div className="card-footer">
					<div className={`btn-group dropright ${this.state.showTools ? 'show' : ''}`}>
						<button
							type="button"
							className="dropdown-toggle"
							data-toggle="dropdown"
							aria-haspopup="true"
							onClick={(e) => this.setState({ showTools: true })}
							aria-expanded={this.state.showTools}
						>
							<IoIosSettings />
						</button>
						<div
							className={`dropdown-menu ${this.state.showTools ? 'show' : ''}`}
							aria-labelledby="dropdownMenu2"
						>
							<button className="dropdown-item" type="button">
								view
							</button>
							<button className="dropdown-item" type="button">
								edit
							</button>
							<button className="dropdown-item" type="button">
								delete
							</button>
						</div>
					</div>
					{/* <IoIosSettings className="float-right" /> */}
				</div>
			</div>
		);
	};

	switchTimeLineStatus = (opened, appointments, time) => {
		if (!opened) return <p className="text-center w-100 display-4 text-danger">STORE CLOSED</p>;
		if (!isEmpty(appointments)) {
			return appointments.map((appointment) => {
				return this.eachAppointment(appointment, time);
			});
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

		return (
			<div className="timeLine card mt-3">
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
						{this.printHeader(working, start, time)}
					</div>
					<div
						className="timeLine-events d-flex flex-column flex-md-row "
						style={
							!isEmpty(start) ? (
								{ paddingLeft: Number(start.minute) / (time * 60) * 100 + '%' }
							) : (
								{ paddingLeft: 0 }
							)
						}
					>
						{!this.props.appointmentsLoading ? (
							this.switchTimeLineStatus(opened, appointments, time)
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
	user: PropTypes.object.isRequired,
	myBusiness: PropTypes.object.isRequired,
	appointments: PropTypes.array.isRequired
	// getBusinessAppointmentsByDate: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	user: state.auth.user,
	myBusiness: state.business.myBusiness,
	appointmentsLoading: state.appointment.loading,
	appointments: state.appointment.appointments
});
export default connect(mapStatetoProps, {})(TimeLine);
