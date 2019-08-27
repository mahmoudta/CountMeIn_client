import React, { Component } from 'react';

export default class ManagmnetForm extends Component {
	componentDidMount() {}
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
				{/* map over Schedule */}
				{values.working.map((day, i) => {
					return (
						<div className="form-group" key={day.day + i}>
							<div className="form-row align-items-center">
								<div className="col-md-4 align-self-start">
									<div className="form-check my-1">
										<input
											className={`form-check-input ${values.step2Errors[day.day]
												? 'is-invalid'
												: ''}`}
											name={day.day}
											value={day.day}
											type="checkbox"
											checked={day.opened}
											onChange={(e) => {
												this.props.handleSchedule(e, i);
											}}
										/>
										<label className="form-check-label text-capitalize">{day.day}</label>
										<div className="invalid-feedback">{values.step2Errors[day.day]}</div>
									</div>
								</div>
								{day.opened ? (
									<div className="col-md-8">
										<div className="form-row align-items-center">
											<div className="col-5 col-md-4">
												<input
													className="form-control form-control-sm "
													type="time"
													name="from"
													value={day.from}
													onChange={(e) => {
														this.props.handleSchedule(e, i);
													}}
												/>
											</div>
											<label className="my-1 mx-1">to</label>
											<div className="col-5 col-md-4">
												<input
													className="form-control form-control-sm"
													type="time"
													name="until"
													value={day.until}
													onChange={(e) => {
														this.props.handleSchedule(e, i);
													}}
												/>
											</div>

											<input
												type="button"
												name="break"
												value={day.break.isBreak ? 'X' : 'set break'}
												className="text-sm mx-1 my-1 text-uppercase btn border-0 fade show"
												onClick={(e) => {
													e.preventDefault();
													this.props.handleSchedule(e, i);
												}}
											/>

											{/* Show another time inputs */}
											<div className="col-5 col-md-4 mt-2">
												<input
													className={`form-control form-control-sm ${!day.break.isBreak
														? 'hide'
														: ''}`}
													type="time"
													name="break_from"
													value={day.break.from}
													onChange={(e) => {
														this.props.handleSchedule(e, i);
													}}
												/>
											</div>
											<label className={`my-1 mx-1 mt-2 ${!day.break.isBreak ? 'hide' : ''}`}>
												to
											</label>
											<div className="col-5 col-md-4 mt-2">
												<input
													className={`form-control form-control-sm ${!day.break.isBreak
														? 'hide'
														: ''}`}
													type="time"
													name="break_until"
													value={day.break.until}
													onChange={(e) => {
														this.props.handleSchedule(e, i);
													}}
												/>
											</div>
											{day.break.isBreak ? <hr className="w-75 ml-0 my-3" /> : ''}
										</div>
									</div>
								) : (
									''
								)}
							</div>
						</div>
					);
				})}
				<div className="form-group">
					<label className="text-uppercase" htmlFor="break">
						break between appointments
					</label>
					<input
						type="number"
						min="10"
						max="120"
						className="form-control"
						name="breakTime"
						placeholder="break time- ex:20"
						value={values.breakTime}
						onChange={this.props.handleChange}
					/>
					<small className="form-text text-muted">optional: default break time 10 minutes</small>
				</div>
			</form>
		);
	}
}
