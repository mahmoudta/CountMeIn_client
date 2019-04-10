import React, { Component } from 'react';

export default class SetFStep extends Component {
	render() {
		//console.log(this.props);
		const { values } = this.props;
		console.log(values.pickedPurpose);
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Set Appointment </div>
							<div className="card-body">
								<form>
									<small className="mb-2">What is the purpose of the appointment ?</small>
									<div className="form-group">
										<label className="text-uppercase" htmlFor="purposes">
											purposes
											<span className="form-required" />
										</label>
										<select
											className="form-control"
											name="subCategory"
											onChange={this.props.handlePickedPurpose}
											value={values.purpose}
										>
											<option>choose one</option>
											{values.onBusiness.profile.purposes.map((purpose) => {
												return (
													<option key={purpose.purpose_id} value={purpose.purpose_id}>
														Purpose {purpose.time}
													</option>
												);
											})}
										</select>
									</div>
								</form>
								<div className="col-12">{<p className="my-3">You have choosed</p>}</div>
							</div>
							<div className="card-footer">
								<button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button className="btn btn-sm btn-primary float-right" onClick={this.props.nextStep}>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
