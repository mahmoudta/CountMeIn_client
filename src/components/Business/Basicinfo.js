import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { B_IMAGES } from '../../consts';

class Basicinfo extends Component {
	render() {
		const { values } = this.props;
		return (
			<form action="">
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
					<div className=" col-12 col-md-6 form-group">
						<label className="text-uppercase" htmlFor="category">
							category
							<span className="form-required" />
						</label>

						<select
							className={`form-control ${!isEmpty(values.step1Errors.category) ? 'is-invalid' : ''}`}
							name="category"
							onChange={this.props.handleChange}
							value={values.category}
						>
							<option>choose one</option>
							{values.categories.map((category, i) => {
								return (
									<option key={category._id + i} value={category._id}>
										{category.name}
									</option>
								);
							})}
						</select>
						<div className="invalid-feedback">{values.step1Errors.category}</div>
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
					<div className="col-12 col-md-5 form-group mb-0">
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
								<div className="col-md-8 mx-auto border mb-2 ">
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
