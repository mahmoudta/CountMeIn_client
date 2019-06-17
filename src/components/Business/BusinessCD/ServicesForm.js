import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { FaBusinessTime } from 'react-icons/fa';
import isEmpty from 'lodash/isEmpty';

class ServicesForm extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { values, categories } = this.props;
		/* converting category  */
		let categoriesOptions = [];
		let servicesOptions = [];

		if (!isEmpty(categories)) {
			categoriesOptions = categories
				.map((category) => {
					return { label: category.name, value: category._id, services: category.services };
				})
				.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));

			servicesOptions = categoriesOptions.map((category) => {
				return category.services
					.map((service) => {
						return { value: service._id, label: service.title, time: service.time, cost: service.cost };
					}, [])
					.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));
			});
		}

		return (
			<form className="p-md-4">
				<h4 className="text-center font-weight-light mb-3">SetUp Your Business Categories And services</h4>
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
						{!isEmpty(categoriesOptions) ? (
							<Select
								options={[].concat.apply([], servicesOptions)}
								// options={categoriesOptions.services
								// 	.map((service) => {
								// 		return {
								// 			value: service._id,
								// 			label: service.title,
								// 			time: service.time,
								// 			cost: service.cost
								// 		};
								// 	})
								// 	.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0))}
								value={values.services}
								isMulti
								name="services"
								components={makeAnimated()}
								closeMenuOnSelect={false}
								onChange={this.props.handleServices}
							/>
						) : (
							''
						)}
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
												onChange={(e) => this.props.handleServices(e, i)}
											/>
											<div className="invalid-feedback">{values.step3Errors[i]}</div>
										</div>

										<div className="input-group input-group-sm my-2">
											<div className="input-group-prepend">
												<span className="input-group-text">&#8362;</span>
											</div>
											<input
												type="number"
												value={service.cost}
												name="cost"
												onChange={(e) => this.props.handleServices(e, i)}
												className="form-control"
											/>
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
ServicesForm.propTypes = {
	categories : PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories
});
export default connect(mapStatetoProps, {})(ServicesForm);
