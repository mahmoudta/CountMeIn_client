import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryList from './CategoryList';
import { getAllCategories } from '../../../actions/categoryActions';
import isEmpty from 'lodash.isempty';
class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parent_category : ''
		};
		this.handleFilter = this.handleFilter.bind(this);
	}
	componentDidMount() {
		this.props.getAllCategories();
	}
	handleFilter = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	render() {
		const { categories } = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Filter</h3>
							</div>
							<div className="card-body">
								<form action="">
									<div className="row">
										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label">parent category</label>
												<select
													className="form-control"
													name="parent_category"
													onChange={this.handleFilter}
												>
													<option value="">Show All</option>
													{categories.map((category) => {
														return (
															<option key={category._id} value={category._id}>
																{category.name}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<CategoryList
							filtered={
								isEmpty(this.state.parent_category) ? (
									categories
								) : (
									categories.filter((category) => {
										return category._id === this.state.parent_category;
									})
								)
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}
AdminDashboard.propTypes = {
	getAllCategories : PropTypes.func.isRequired
};

const mapStatetoProps = (state) => ({
	categories : state.category.categories,
	loading    : state.category.loading
});
export default connect(mapStatetoProps, { getAllCategories })(AdminDashboard);
