import React, { Component } from 'react';

export default class SetSecStep extends Component {
	componentDidMount() {
		const date = new Date();
		var today =
			date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		this.setState({ date_from: today, date_until: today, today: today });
	}

	render() {
		//console.log(this.props);

		const { values } = this.props;
		console.log(values);
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Set Appointment </div>
							<div className="card-body">
								<form>
									<small className="mb-2">Step 2</small>
									<div className="form-group">
										<label className="form-label" htmlFor="">
											date from
											<span className="form-required" />
										</label>
										<input
											type="date"
											className="form-control"
											name="date_from"
											min={values.today}
											value={values.date_from}
											onChange={this.props.handleChange}
										/>

										<div className="form-group">
											<label className="form-label" htmlFor="">
												date To
												<span className="form-required" />
											</label>
											<input
												type="date"
												className="form-control"
												name="date_until"
												min={values.today}
												value={values.date_until}
												onChange={this.props.handleChange}
											/>
										</div>
									</div>
								</form>
								<div className="col-12">{<p className="my-3">You have choosed</p>}</div>
							</div>
							<div className="card-footer">
								<button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button className="btn btn-sm btn-primary float-right" onClick={this.props.freeTime}>
									Show me free Time
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
