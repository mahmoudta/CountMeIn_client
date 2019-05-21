import React, { Component } from 'react';

export default class CreateSecStep extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { values } = this.props;
		return (
			<form className="p-md-4">
				<h4 className="text-center font-weight-light mb-3">Working Days and breaks</h4>
				<div className="form-group">
					<label className="text-uppercase" htmlFor="working hours">
						working hours
						<span className="form-required" />
					</label>
					<small className="form-text text-muted">
						* your business must open at least 1 day , please fill a proper time
					</small>
				</div>
				{values.working.map((day) => {
					return (
						<div className="form-group" key={day.day}>
							<div className="form-row align-items-center">
								<div className="col-md-4">
									<div className="form-check my-1">
										<input
											className={`form-check-input ${values.step2Errors['sunday']
												? 'is-invalid'
												: ''}`}
											name={day.day}
											type="checkbox"
											checked={day.opened}
											value="sunday"
											// onChange={this.props.handleSchedule}
										/>
										<label className="form-check-label text-capitalize">{day.day}</label>
										{/* <div className="invalid-feedback">{values.step2Errors['sunday']}</div> */}
									</div>
								</div>

								<div className="col-md-8">
									<div className="form-row align-items-center">
										<div className="col-5 col-md-4">
											<input
												className="form-control form-control-sm"
												type="time"
												name="from"
												value={day.from}
												// onChange={(e) => this.props.handleSchedule(e, 'sunday')}
											/>
										</div>
										<label className="my-1 mx-1">to</label>
										<div className="col-5 col-md-4">
											<input
												className="form-control form-control-sm"
												type="time"
												name="until"
												value={day.until}
												// onChange={(e) => this.props.handleSchedule(e, 'sunday')}
											/>
										</div>
										<a href="#" className="text-sm mx-1 my-1 text-uppercase">
											<u>set break</u>
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				{/* sunday */}

				{values.working['sunday'] && (
					<div className="col-md-8">
						<div className="form-row align-items-center">
							<div className="col-5 col-md-4">
								<input
									className="form-control form-control-sm"
									type="time"
									name="from"
									value={values.working['sunday'] ? values.working['sunday'].from : '00:00'}
									onChange={(e) => this.props.handleSchedule(e, 'sunday')}
								/>
							</div>
							<label className="my-1 mx-1">to</label>
							<div className="col-5 col-md-4">
								<input
									className="form-control form-control-sm"
									type="time"
									name="until"
									value={values.working['sunday'] ? values.working['sunday'].until : '00:00'}
									onChange={(e) => this.props.handleSchedule(e, 'sunday')}
								/>
							</div>
							<a href="#" className="text-sm mx-1 my-1 text-uppercase">
								<u>set break</u>
							</a>
						</div>
					</div>
				)}

				<div className="form-group">
					<label className="text-uppercase" htmlFor="brak">
						break between appointments
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
					<small className="form-text text-muted">optional: default break time 10 minutes</small>
				</div>
			</form>
		);
	}
}
