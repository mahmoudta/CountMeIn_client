import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getBusinessAppointmentsByDate } from '../../../actions/appointmentsAction';
import { getCurrentDate, getDay, getTimeDifference, getTime, getWorkDay } from '../../../utils/date';

import '../Business.css';

import axios from 'axios';
import { API } from '../../../consts';
import TimeLine from './TimeLine';

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
		const id = this.props.match.params.id;
		const date = getCurrentDate('-');
		const day = getDay(date);

		this.setState({ business_id: id, date, day, loading: true });
		this.props.getBusinessAppointmentsByDate(id, date).then((res) => {
			this.setState({ loading: false });
		});
	}

	pickDate = (date) => {
		console.log(date);
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
			<section className="my-5">
				<div className="container">
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
	getBusinessAppointmentsByDate: PropTypes.func.isRequired

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
export default connect(mapStatetoProps, { getBusinessAppointmentsByDate })(Schedule);

// Garbage
{
	/* <div className="container">
<div className="card">
	<div className="card-header">
		<h3 className="card-title">apoointments list</h3>
		<div className="card-options">
			<NavLink to="/business/mySchedule/new-appointment" className="btn btn-sm btn-success">
				new appointment
			</NavLink>
		</div>
	</div>
	<div className="table-responsive">
		<table className="table card-table mb-0 table-vcenter text-nowrap listTable">
			<thead>
				<tr>
					<th>date</th>
					<th>start</th>
					<th>length</th>
					<th>user</th>
				</tr>
			</thead>
			<tbody>
				{this.state.appointments.map((appointment) => {
					return (
						<tr key={appointment.date}>
							<td key={appointment.time.date.slice(0, 10)}>
								{appointment.time.date.slice(0, 10)}
							</td>
							<td key={appointment.time.date.slice(12, 16)}>
								{appointment.time.date.slice(12, 16) + 'GMT'}
							</td>
							<td key={appointment.time.hours + appointment.client_id}>
								{appointment.time.hours +
									' hours :' +
									appointment.time.minutes +
									' minutes'}
							</td>
							<td key={appointment.client_id + appointment.time.minutes}>
								{appointment.client_id}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</div>
</div>
</div> */
}
