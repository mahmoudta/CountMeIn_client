import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import axios from 'axios';
import { API } from '../../../consts';

class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false,
			loading: false,
			business_id: '',
			appointments: []
		};
	}
	componentDidMount() {
		if (!isEmpty(this.props.myBusiness._id)) {
			this.setState({ loading: true });
			axios
				.get(`${API}/appointments/getBusinessAppointments/${this.props.myBusiness._id}`)
				.then((response) => {
					this.setState({ appointments: response.data.appointments, loading: false });
				})
				.catch((err) => console.log(err));
			this.setState({ loading: false });
		}
	}
	render() {
		return (
			<section className="my-5">
				<div className="container">
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
				</div>
			</section>
		);
	}
}
Schedule.propTypes = {
	myBusiness: PropTypes.object.isRequired,
	customers: PropTypes.array.isRequired,
	services: PropTypes.array.isRequired
};
// Schedule.contextTypes = {
// 	router: PropTypes.object.isRequired
// };
const mapStatetoProps = (state) => ({
	// auth: state.auth,
	myBusiness: state.business.myBusiness,
	customers: state.business.businessFollowers,
	services: state.business.businessServices
});
export default connect(mapStatetoProps, {})(Schedule);
