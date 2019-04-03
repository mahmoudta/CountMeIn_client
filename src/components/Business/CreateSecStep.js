import React, { Component } from 'react';

export default class CreateSecStep extends Component {
	render() {
		const { values } = this.props;
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Business Managment</div>
							<div className="card-body">
								<form action="">
									<div className="form-group">
										<label className="text-uppercase" htmlFor="working hours">
											working hours
											<span className="form-required" />
										</label>
									</div>
									{/* sunday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="sunday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Sunday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="sunday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="sunday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* Monday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="monday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Monday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="monday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="monday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* tuesday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="tuesday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Tuesday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="tuesday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="tuesday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* wedensday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="wedensday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Wedensday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="wedensday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="wedensday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* thursday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="thursday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Thursday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="thursday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="thursday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* friday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="friday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Friday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="friday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="friday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									{/* satarday */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-4">
												<div className="form-check">
													<input
														className="form-check-input"
														name="working"
														type="checkbox"
														value="satarday"
														onChange={this.props.handleWork}
													/>
													<label className="form-check-label">Satarday</label>
												</div>
											</div>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="satarday from"
													onChange={this.props.handleTime}
												/>
											</div>
											<span className="mx-1">to</span>
											<div className="col-md-3">
												<input
													className="form-control form-control-sm"
													type="time"
													name="satarday until"
													onChange={this.props.handleTime}
												/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="text-uppercase" htmlFor="brak">
											break time
											<span className="form-required" />
										</label>
										<input
											type="number"
											min="10"
											max="120"
											className="form-control"
											name="break"
											placeholder="break time- ex:20"
											value={values.break}
											onChange={this.props.handleChange}
										/>
										<small className="form-text text-muted">
											optional: default break time 10 minutes
										</small>
									</div>
								</form>
							</div>
							<div className="card-footer ">
								<button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button className="btn btn-sm btn-primary float-right" onClick={this.props.nextStep}>
									next
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
