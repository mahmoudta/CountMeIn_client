import React, { Component } from 'react';
import Select from 'react-select';

export default class CreateThirdStep extends Component {
	render() {
		const { values } = this.props;
		const options = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' }
		];
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Basic info</div>
							<div className="card-body">
								<form>
									<small className="mb-2">
										you have to choose at least one purpose to countinue.<br />
										you can modify the time of the purpose
									</small>
									<div className="form-group">
										<label className="text-uppercase" htmlFor="purposes">
											purposes
											<span className="form-required" />
										</label>
										<Select options={options} />
										{/* <select
											className="form-control"
											name="subCategory"
											onChange={this.props.handleChange}
										>
											<option>choose one</option>
											{values.categories
												.filter((category) => {
													return category._id === values.category;
												})
												.map((category) => {
													return category.subCats.map((subCat) => {
														return (
															<option
																value={subCat._id}
																key={subCat._id}
																time={subCat.time}
															>
																{subCat.sub}
															</option>
														);
													});
												})}
										</select> */}
									</div>
								</form>
								<div className="col-12">
									{values.purposes.map((purpose) => {
										return (
											<p className="my-3">
												name: {purpose.name}
												<br />
												time: {purpose.time}
												<br />
											</p>
										);
									})}
								</div>
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
