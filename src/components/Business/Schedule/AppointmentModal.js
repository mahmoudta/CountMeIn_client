import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { FaBusinessTime, FaShekelSign } from 'react-icons/fa';
import moment from 'moment';

export default class AppointmentModal extends Component {
	constructor(props) {
		super(props);
		this.setState = { show: false };
		this.renderAppointmentTime = this.renderAppointmentTime.bind(this);
	}

	renderAppointmentTime(time, status) {
		switch (status) {
			case 'ready':
				let start = moment(time.date).set({ hour: time.start._hour, minute: time.start._minute }).fromNow();
				return <p className="d-block w-100 text-center text-muted">{`starts  ${start}`}</p>;
			case 'inProgress':
				let end = moment(time.date).set({ hour: time.end._hour, minute: time.end._minute }).fromNow();
				return <p className="d-block w-100 text-center text-muted">{`ends  ${end}`}</p>;
			case 'passed':
				let ended = moment(time.date).set({ hour: time.end._hour, minute: time.end._minute }).fromNow();
				return <p className="d-block w-100 text-center text-muted">{`ended  ${ended}`}</p>;

			default:
				break;
		}
	}

	render() {
		const { appointment, myBusiness } = this.props;
		let total_cost = 0,
			total_time = 0;
		return (
			<div
				className={`modal fade ${this.props.show ? 'show' : ''}`}
				tabIndex="-1"
				role="dialog"
				style={{
					display : `${this.props.show ? 'block' : ''} `
				}}
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					{!isEmpty(appointment) ? (
						<div className="modal-content">
							<div className="modal-header border-0 bg-light">
								<div className="w-100">
									<p className="d-block w-100 text-center text-muted text-capitalize">
										<strong>{appointment.status}</strong>
									</p>
									{this.renderAppointmentTime(appointment.time, appointment.status)}
								</div>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={this.props.closeModal}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="col-5 mx-auto col-md-3 mx-md-0">
										<img
											className="img-fluid"
											src="http://bootdey.com/img/Content/avatar/avatar7.png"
											alt=""
										/>
									</div>
									<div className="col-12 col-md-8 p-3">
										<h2 className="h5 text-muted font-weight-light ">
											{appointment.client_id.profile.name.first +
												' ' +
												appointment.client_id.profile.name.last}
										</h2>
									</div>
									<hr className="w-100 " />

									<div className="table-responsive">
										<table className="table card-table mb-0 table-vcenter text-nowrap">
											<thead>
												<tr>
													<th>service</th>
													<th>time</th>
													<th>cost</th>
												</tr>
											</thead>
											<tbody>
												{appointment.services.map((service) => {
													const busniessService = myBusiness.services.find((bService) => {
														return (
															bService.service_id._id.toString() ===
															service._id.toString()
														);
													});
													total_cost += busniessService.cost;
													total_time += busniessService.time;

													return (
														<tr
															key={
																service.title +
																busniessService.time +
																busniessService.cost
															}
														>
															<td>{service.title}</td>
															<td>{`${busniessService.time} minutes`}</td>
															<td>{`${busniessService.cost} NIS`}</td>
														</tr>
													);
												})}
												<tr key={'total' + total_time + total_cost}>
													<td>
														<strong>total</strong>
													</td>
													<td>
														<strong>{`${total_time} minutes`}</strong>
													</td>
													<td>
														<strong>{`${total_cost} NIS`}</strong>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>

							<div className="modal-footer">
								{/* <div className="float-left">
									<button
										type="button"
										className="btn btn-secondary float-left"
										data-dismiss="modal"
										onClick={this.props.closeModal}
									>
										Close
									</button>
								</div> */}
								{
									{
										['ready']      : (
											<button type="button" className="btn btn-success text-uppercase">
												check in
											</button>
										),
										['inProgress'] : (
											<button type="button" className="btn btn-danger text-uppercase">
												check out
											</button>
										)
									}[appointment.status]
								}
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
