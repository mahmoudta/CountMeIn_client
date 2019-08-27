import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

class UpComing extends Component {
	render() {
		const { upComing } = this.props;
		return (
			<div className="card border-0 shadow-sm">
				<div className="card-header text-center bg-secondary text-white">
					<h6 className="card-title w-100 text-center">Up Coming</h6>
				</div>
				<div className="card-body">
					{upComing.length > 0 ? (
						<div className="table-responsive">
							<table className="table card-table mb-0 table-vcenter text-nowrap">
								<thead>
									<tr>
										<th>Customer</th>
										<th>Services</th>
										<th>time</th>
										<th>status</th>
									</tr>
								</thead>
								<tbody>
									{upComing.map((appointment) => {
										return (
											<tr key={appointment._id}>
												<td>{appointment.client_id.profile.name.first}</td>
												<td>
													{appointment.services.map((service) => {
														return <span key={service._id}>{service.title}</span>;
													})}
												</td>
												<td>
													{appointment.status === 'inProgress' ? (
														`ENDS ${moment(appointment.time.date)
															.set({
																hour   : appointment.time.end._hour,
																minute : appointment.time.end._minute
															})
															.fromNow()}`
													) : (
														`STARTS ${moment(appointment.time.date)
															.set({
																hour   : appointment.time.start._hour,
																minute : appointment.time.start._minute
															})
															.fromNow()}`
													)}
												</td>
												<td>{appointment.status}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : (
						<p className="w-100 text-center text-muted"> No appointments</p>
					)}
				</div>
			</div>
		);
	}
}

UpComing.propTypes = {
	upComing : PropTypes.array.isRequired
};

const mapStatetoProps = (state) => ({
	upComing : state.appointment.upComing
});
export default connect(mapStatetoProps, {})(UpComing);
