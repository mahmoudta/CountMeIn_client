import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { FaBusinessTime, FaShekelSign } from 'react-icons/fa';

export default class AppointmentModal extends Component {
	constructor(props) {
		super(props);
		this.setState = { show: false };
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = (event) => {};
	render() {
		const { appointment } = this.props;
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
								<p className="d-block w-100 text-center text-muted">{appointment.status}</p>
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
									<div className="col-12">
										<div className="row">
											<div className="col-4">
												<h4 className="h6">Services:</h4>
											</div>
											<div className="col-8">
												{appointment.services.map((service) => {
													total_cost += service.cost;
													total_time += service.time;

													return (
														<div key={service._id}>
															<h6 className="font-weight-normal">{service.title}</h6>
															<span className="text-muted">
																<FaBusinessTime />
																{service.time}
															</span>
															<span className="text-muted mx-3">
																<FaShekelSign />
																{service.cost}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</div>
									<div className="col-12 my-3">
										<div className="row">
											<div className="col-4">
												<h4 className="h6">Total:</h4>
											</div>
											<div className="col-8">
												<span>
													{total_cost} <FaShekelSign />
												</span>
												<span>
													{total_time} <FaBusinessTime />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="modal-footer">
								<div className="float-left">
									<button
										type="button"
										className="btn btn-secondary float-left"
										data-dismiss="modal"
										onClick={this.props.closeModal}
									>
										Close
									</button>
								</div>

								<button type="button" className="btn btn-primary">
									Save changes
								</button>
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
