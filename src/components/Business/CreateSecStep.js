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
										<small className="form-text text-muted">
											* your business must open at least 1 day , please fill a proper time
										</small>
									</div>

									{/* sunday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['sunday']
															? 'is-invalid'
															: ''}`}
														name="sunday"
														type="checkbox"
														checked={values.working['sunday'] ? true : false}
														value="sunday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Sunday</label>
													<div className="invalid-feedback">
														{values.step2Errors['sunday']}
													</div>
												</div>
											</div>
											{values.working['sunday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['sunday'] ? (
																		values.working['sunday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'sunday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['sunday'] ? (
																		values.working['sunday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'sunday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* monday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['monday']
															? 'is-invalid'
															: ''}`}
														name="monday"
														type="checkbox"
														checked={values.working['monday'] ? true : false}
														value="monday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Monday</label>
													<div className="invalid-feedback">
														{values.step2Errors['monday']}
													</div>
												</div>
											</div>
											{values.working['monday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['monday'] ? (
																		values.working['monday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'monday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['monday'] ? (
																		values.working['monday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'monday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* tuesday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['tuesday']
															? 'is-invalid'
															: ''}`}
														name="tuesday"
														type="checkbox"
														checked={values.working['tuesday'] ? true : false}
														value="tuesday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Tuesday</label>
													<div className="invalid-feedback">
														{values.step2Errors['tuesday']}
													</div>
												</div>
											</div>
											{values.working['tuesday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['tuesday'] ? (
																		values.working['tuesday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'tuesday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['tuesday'] ? (
																		values.working['tuesday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'tuesday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* wednesday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['wednesday']
															? 'is-invalid'
															: ''}`}
														name="wednesday"
														type="checkbox"
														checked={values.working['wednesday'] ? true : false}
														value="wednesday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Wednesday</label>
													<div className="invalid-feedback">
														{values.step2Errors['wednesday']}
													</div>
												</div>
											</div>
											{values.working['wednesday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['wednesday'] ? (
																		values.working['wednesday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'wednesday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['wednesday'] ? (
																		values.working['wednesday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'wednesday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* thursday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['thursday']
															? 'is-invalid'
															: ''}`}
														name="thursday"
														type="checkbox"
														checked={values.working['thursday'] ? true : false}
														value="thursday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Thursday</label>
													<div className="invalid-feedback">
														{values.step2Errors['thursday']}
													</div>
												</div>
											</div>
											{values.working['thursday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['thursday'] ? (
																		values.working['thursday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'thursday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['thursday'] ? (
																		values.working['thursday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'thursday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* friday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['friday']
															? 'is-invalid'
															: ''}`}
														name="friday"
														type="checkbox"
														checked={values.working['friday'] ? true : false}
														value="friday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Friday</label>
													<div className="invalid-feedback">
														{values.step2Errors['friday']}
													</div>
												</div>
											</div>
											{values.working['friday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['friday'] ? (
																		values.working['friday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'friday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['friday'] ? (
																		values.working['friday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) => this.props.handleSchedule(e, 'friday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* saturday */}
									<div className="form-group">
										<div className="form-row align-items-center">
											<div className="col-md-4">
												<div className="form-check my-1">
													<input
														className={`form-check-input ${values.step2Errors['saturday']
															? 'is-invalid'
															: ''}`}
														name="saturday"
														type="checkbox"
														checked={values.working['saturday'] ? true : false}
														value="saturday"
														onChange={this.props.handleSchedule}
													/>
													<label className="form-check-label">Saturday</label>
													<div className="invalid-feedback">
														{values.step2Errors['saturday']}
													</div>
												</div>
											</div>
											{values.working['saturday'] && (
												<div className="col-md-8">
													<div className="form-row align-items-center">
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="from"
																value={
																	values.working['saturday'] ? (
																		values.working['saturday'].from
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'saturday')}
															/>
														</div>
														<label className="my-1 mx-1">to</label>
														<div className="col-5 col-md-4">
															<input
																className="form-control form-control-sm"
																type="time"
																name="until"
																value={
																	values.working['saturday'] ? (
																		values.working['saturday'].until
																	) : (
																		'00:00'
																	)
																}
																onChange={(e) =>
																	this.props.handleSchedule(e, 'saturday')}
															/>
														</div>
														<a href="#" className="text-sm mx-1 my-1 text-uppercase">
															<u>set break</u>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>

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
