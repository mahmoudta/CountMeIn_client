import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { getAllCategories, createCategory, addService } from '../../../actions/categoryActions';

import { FaArrowLeft } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

import Swal from 'sweetalert2';

class CreateCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			parent_category: '',
			time: 10,
			isService: false,
			loading: false,
			alert: '',
			cost: 0
		};
		this.onChange = this.onChange.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
	}
	componentDidMount() {
		if (isEmpty(this.props.categories)) {
			this.props.getAllCategories();
		}
	}
	onChange = (e) => {
		const target = e.target;
		var { isService } = this.state;
		if (target.name === 'parent_category') {
			if (!isEmpty(target.value)) {
				isService = true;
			} else {
				isService = false;
			}
		}

		this.setState({ [target.name]: target.value, isService: isService });
	};

	Alert = async (redirect, text) => {
		Swal.fire({
			title: redirect ? 'Success' : 'Error!',
			text: text,
			type: redirect ? 'success' : 'error',
			focusConfirm: false,
			confirmButtonText: redirect ? 'done' : 'back',
			confirmButtonColor: redirect ? '#5eba00' : '#495057'
		}).then((res) => {
			if (redirect) this.context.router.history.push('/dashboard');
		});
	};

	formSubmit = (e) => {
		e.preventDefault();
		const { isService, name, time, parent_category, cost } = this.state;
		this.setState({ loading: true });
		if (!isService) {
			this.props.createCategory({ name }).then((res) => {
				const redirect = res.type === 'CREATE_CATEGORY' ? true : false;
				this.setState({ loading: false });
				this.Alert(redirect, res.payload);
			});
		} else {
			this.props.addService({ parent_category, name, time, cost }).then((res) => {
				const redirect = res.type === 'CREATE_CATEGORY' ? true : false;
				this.setState({ loading: false });
				this.Alert(redirect, res.payload);
			});
		}
	};

	render() {
		if (isEmpty(this.props.categories)) {
			this.props.getAllCategories();
		}
		return (
			<section className="mt-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">
										new category <span className="text-muted"> OR </span> sub category{' '}
									</h3>
								</div>
								<div className="card-body">
									<form onSubmit={this.formSubmit}>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label">
														category name
														<span className="form-required" />
													</label>
													<input
														className="form-control"
														type="text"
														name="name"
														placeholder="category name"
														value={this.state.name}
														onChange={this.onChange}
														required
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label">parent category</label>
													<select
														className="form-control"
														name="parent_category"
														value={this.state.parent_category}
														onChange={this.onChange}
													>
														<option value="">select parent category</option>
														{this.props.categories.map((cat, i) => {
															return (
																<option key={i + cat._id} value={cat._id}>
																	{cat.name}
																</option>
															);
														})}
													</select>
												</div>
											</div>
											<div className={this.state.isService ? 'col-md-4' : 'hide'}>
												<div className="form-group">
													<label className="form-label">
														time
														<span className="form-required" />
													</label>
													{/* {!isEmpty(this.state.alert) ? (
														<div class="alert alert-danger" role="alert">
															{this.state.alert}
														</div>
													) : (
														''
													)} */}
													<div className="input-group mb-2 mr-sm-2">
														<div className="input-group-prepend">
															<div className="input-group-text">
																<FaClock /> <span className="mx-2">minutes</span>
															</div>
														</div>
														<input
															className="form-control"
															type="number"
															name="time"
															placeholder="Ex: 20"
															min="10"
															max="120"
															required={this.state.isService}
															value={this.state.time}
															onChange={this.onChange}
														/>
														<small className="form-text text-muted w-100">
															your time must be 10 - 120 minutes
														</small>
													</div>
												</div>
											</div>

											<div className={this.state.isService ? 'col-md-4' : 'hide'}>
												<div className="form-group">
													<label className="form-label">cost</label>
													{/* {!isEmpty(this.state.alert) ? (
														<div class="alert alert-danger" role="alert">
															{this.state.alert}
														</div>
													) : (
														''
													)} */}
													<div className="input-group mb-2 mr-sm-2">
														<div className="input-group-prepend">
															<div className="input-group-text">&#8362;</div>
														</div>
														<input
															className="form-control"
															type="number"
															name="cost"
															placeholder="Ex: 50"
															required={this.state.isService}
															value={this.state.cost}
															onChange={this.onChange}
														/>
													</div>
												</div>
											</div>

											<hr className="my-4 w-100" />
											<div className="col-12 clear-fix">
												{!this.state.loading ? (
													<button type="submit" className="btn btn-success float-left">
														<FaCheck /> create
													</button>
												) : (
													<div className="spinner-grow text-success" role="status">
														<span className="sr-only">Loading...</span>
													</div>
												)}
												<Link to="/dashboard" className="btn btn-secondary ml-auto float-right">
													<FaArrowLeft /> back
												</Link>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

CreateCategory.propTypes = {
	categories: PropTypes.array.isRequired,
	getAllCategories: PropTypes.func.isRequired,
	createCategory: PropTypes.func.isRequired,
	addService: PropTypes.func.isRequired
};
CreateCategory.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories: state.category.categories
});
export default connect(mapStatetoProps, { getAllCategories, createCategory, addService })(CreateCategory);
