import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import CategoryList from './CategoryList';
class AdminDashboard extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Search</h3>
							</div>
							<div className="card-body">
								<form action="">
									<div className="row">
										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label">category name</label>
												<input
													className="form-control"
													type="text"
													name="category_name"
													placeholder="category name"
												/>
											</div>
										</div>
										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label">parent category</label>
												<select className="form-control" name="parent_category">
													<option value="">select parent category</option>
												</select>
											</div>
										</div>
										<div className="col-12">
											<button className="btn btn-primary btn-sm">search</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<CategoryList />
					</div>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
