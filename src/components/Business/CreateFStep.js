import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { IMAGES } from '../../consts';

export default class CreateFStep extends Component {
	render() {
		const { values } = this.props;
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Basic info</div>
							<div className="card-body">
								<form action="">
									<div className="form-group">
										<label className="text-uppercase" htmlFor="name">
											Business name
											<span className="form-required" />
										</label>
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="business name"
											value={values.name}
											onChange={this.props.handleChange}
										/>
									</div>
									<div className="form-group">
										<label className="text-uppercase" htmlFor="category">
											category
											<span className="form-required" />
										</label>
										<select
											className="form-control"
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
									</div>
									<div className="form-group mb-0">
										<label className="text-uppercase " htmlFor="name">
											image
											<span className="form-required" />
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
													<img
														className="w-100 img-fluid"
														src={IMAGES + '/' + values.img}
														alt=""
													/>
												</div>
											</div>
										) : (
											''
										)}
									</div>
									<div className="custom-file">
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
								</form>
							</div>
							<div className="card-footer ">
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
