import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { B_IMAGES } from '../../../consts';

class Basicinfo extends Component {
	render() {
		const { values } = this.props;
		return (
			<form className="p-md-4">
				<div className="row">
					<div className="col-12 col-md-6 form-group">
						<label className="text-uppercase" htmlFor="name">
							Business name
							<span className="form-required" />
						</label>
						<input
							type="text"
							className={`form-control ${!isEmpty(values.step1Errors.name) ? 'is-invalid' : ''}`}
							name="name"
							placeholder="business name"
							value={values.name}
							onChange={this.props.handleChange}
						/>
						<div className="invalid-feedback">{values.step1Errors.name}</div>
					</div>

					<div className="col-12 col-md-5 form-group">
						<label className="text-uppercase" htmlFor="phone">
							Phone Number
							<span className="form-required" />
						</label>
						<input
							type="phone"
							className={`form-control ${!isEmpty(values.step1Errors.phone) ? 'is-invalid' : ''}`}
							name="phone"
							placeholder="phone number"
							value={values.phone}
							onChange={this.props.handleChange}
						/>
						<div className="invalid-feedback">{values.step1Errors.phone}</div>
					</div>

					<div className="col-12 form-row my-3">
						<div className="col-12">
							<label className="text-uppercase text-secondary" htmlFor="location">
								address
							</label>
						</div>

						<div className="col-6 col-md-3">
							<small className="form-text text-muted">CITY</small>
							<input
								type="text"
								className="form-control"
								name="city"
								placeholder="TEL AVIV"
								value={values.city}
								onChange={this.props.handleChange}
							/>
						</div>

						<div className="col-6 col-md-3">
							<small className="form-text text-muted">STREET</small>
							<input
								type="text"
								className="form-control"
								name="street"
								placeholder="Rotsheld"
								value={values.street}
								onChange={this.props.handleChange}
							/>
						</div>

						<div className="col-6 col-md-3">
							<small className="form-text text-muted">BUILDING</small>

							<input
								type="number"
								className="form-control"
								name="building"
								placeholder="80"
								value={values.building}
								onChange={this.props.handleChange}
							/>
						</div>

						<div className="col-6 col-md-3">
							<small className="form-text text-muted">POSTAL CODE</small>

							<input
								type="number"
								max="7"
								className="form-control"
								name="postal_code"
								placeholder="7 Digits"
								value={values.postal_code}
								onChange={this.props.handleChange}
							/>
						</div>
					</div>

					<div className="col-12 col-md-7 form-group">
						<label className="text-uppercase" htmlFor="phone">
							description
						</label>
						<textarea
							type="text"
							className="form-control"
							name="description"
							placeholder="Some text about the business"
							value={values.description}
							onChange={this.props.handleChange}
						/>
					</div>
					<div className="col-12 col-md-7 form-group mb-0">
						<label className="text-uppercase " htmlFor="name">
							image
							{values.imgLoading ? (
								<div
									className="spinner-border text-primary"
									style={{ height: '20px', width: '20px' }}
									role="status"
								>
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								''
							)}
						</label>
						{!isEmpty(values.img) ? (
							<div className="row">
								<div className="col-md-5 mb-2 ">
									<img className="w-100 img-fluid" src={B_IMAGES + '/' + values.img} alt="" />
								</div>
							</div>
						) : (
							''
						)}
					</div>
					<div className="col-12">
						<div className="col-md-5 custom-file">
							<input
								type="file"
								className="custom-file-input"
								name="img"
								placeholder="your image "
								accept="image/*"
								onChange={this.props.uploadFile}
							/>
							<label className="custom-file-label" htmlFor="">
								image..
							</label>
						</div>
					</div>
				</div>

				{/* 


		 */}
			</form>
		);
	}
}

export default Basicinfo;
