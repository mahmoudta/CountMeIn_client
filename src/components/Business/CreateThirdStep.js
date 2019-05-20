import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { FaBusinessTime } from 'react-icons/fa';

export default class CreateThirdStep extends Component {
	render() {
		const { values } = this.props;

		const options = values.categories
			.filter((category) => {
				return category._id === values.category;
			})
			.map((category) => {
				return category.services
					.map((service) => {
						return { value: service._id, label: service.title, time: service.time, cost: service.cost };
					})
					.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));
			});
		console.log(options);
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Basic info</div>
							<div className="card-body">
								<form>
									<div className="form-row">
										<div className="col-12 mb-3">
											<small className="mb-2">
												you have to choose at least one service to countinue.<br />
												you can modify the time and the cost of these services.
											</small>
										</div>
										<div className="col-12">
											<label className="text-uppercase" htmlFor="purposes">
												Services
												<span className="form-required" />
											</label>
											<Select
												options={options[0]}
												value={values.services}
												isMulti
												components={makeAnimated()}
												closeMenuOnSelect={false}
												onChange={this.props.handleServices}
											/>
										</div>
									</div>
									<hr />

									<div className="form-group">
										<div className="row">
											{values.services.map((service, i) => {
												return (
													<div className="col-3 py-2" key={service.value + i}>
														<div className="col-12 border rounded py-2 bg-light">
															<span className="mb-2 d-block w-100 text-center">
																{service.label}
															</span>
															<div className="input-group input-group-sm">
																<div className="input-group-prepend">
																	<span className="input-group-text">
																		<FaBusinessTime />
																	</span>
																</div>
																<input
																	type="number"
																	className={`form-control ${values.step3Errors[i]
																		? 'is-invalid'
																		: ''}`}
																	name="time"
																	value={service.time}
																	onChange={(e) => this.props.handleTime(e, i)}
																/>
																<div className="invalid-feedback">
																	{values.step3Errors[i]}
																</div>
															</div>

															<div className="input-group input-group-sm my-2">
																<div className="input-group-prepend">
																	<span className="input-group-text">&#8362;</span>
																</div>
																<input type="number" className="form-control" />
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</form>
							</div>
							<div className="card-footer">
								<button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button
									className="btn btn-sm btn-primary float-right"
									onClick={this.props.handleSubmit}
								>
									submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
