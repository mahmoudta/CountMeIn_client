import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { FaBusinessTime } from 'react-icons/fa';

export default class ServicesForm extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { values } = this.props;
		const categoriesOptions = values.mainCategories
			.map((category) => {
				return { label: category.name, value: category._id, services: category.services };
			}, [])
			.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));

		const servicesOptions = values.categories.map((category) => {
			return category.services
				.map((service) => {
					return { value: service._id, label: service.title, time: service.time, cost: service.cost };
				})
				.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));
		});

		console.log(servicesOptions);

		// const options = [];

		return (
			<form className="p-md-4">
				<h4 className="text-center font-weight-regular" />
				<div className="form-row">
					<div className="col-12 mb-3">
						<small className="mb-2">
							you have to choose at least one service to countinue.<br />
							you can modify the time and the cost of these services.
						</small>
					</div>
					<div className="col-12 my-3">
						<label className="text-uppercase" htmlFor="purposes">
							Categories
							<span className="form-required" />
						</label>
						<Select
							options={categoriesOptions}
							name="categories"
							value={values.categories}
							isMulti
							components={makeAnimated()}
							onChange={this.props.handleServices}
						/>
					</div>
					<div className="col-12 my-3">
						<label className="text-uppercase" htmlFor="purposes">
							Services
							<span className="form-required" />
						</label>
						<Select
							options={servicesOptions[0]}
							value={values.services}
							isMulti
							name="services"
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
										<span className="mb-2 d-block w-100 text-center">{service.label}</span>
										<div className="input-group input-group-sm">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<FaBusinessTime />
												</span>
											</div>
											<input
												type="number"
												className={`form-control ${values.step3Errors[i] ? 'is-invalid' : ''}`}
												name="time"
												value={service.time}
												onChange={(e) => this.props.handleTime(e, i)}
											/>
											<div className="invalid-feedback">{values.step3Errors[i]}</div>
										</div>

										<div className="input-group input-group-sm my-2">
											<div className="input-group-prepend">
												<span className="input-group-text">&#8362;</span>
											</div>
											<input type="number" value={service.cost} className="form-control" />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</form>
		);
	}
}