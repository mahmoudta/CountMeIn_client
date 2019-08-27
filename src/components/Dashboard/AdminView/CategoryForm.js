import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FaArrowLeft } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import isEmpty from 'lodash/isEmpty';

class CategoryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name            : '',
			id              : '',
			parent_category : '',
			time            : 10,
			isService       : false,
			// loading         : false,
			// alert           : '',
			cost            : 0
		};
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		const { edit } = this.props;
		console.log('edit', edit);
		if (!isEmpty(edit)) {
			this.setState({
				name            : edit.name,
				id              : edit.id,
				parent_category : edit.parent_category || '',
				time            : edit.time || 10,
				isService       : edit.isService,
				cost            : edit.cost || 0
			});
		}
	}
	onChange = (event) => {
		const { name, value } = event.target;
		var { isService } = this.state;
		if (name === 'parent_category') {
			if (!isEmpty(value)) {
				isService = true;
			} else {
				isService = false;
			}
		}

		this.setState({ [name]: value, isService: isService });
	};
	render() {
		return (
			<form
				onSubmit={(e) => {
					this.props.formSubmit(e, this.state);
				}}
			>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label className="form-label">
								{this.state.isService ? 'Service Name' : 'Category Name'}
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
								disabled={!isEmpty(this.props.edit) ? true : false}
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
								<small className="form-text text-muted w-100">your time must be 10 - 120 minutes</small>
							</div>
						</div>
					</div>

					<div className={this.state.isService ? 'col-md-4' : 'hide'}>
						<div className="form-group">
							<label className="form-label">cost</label>

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
								<FaCheck /> Save
							</button>
						) : (
							<div className="spinner-grow text-success" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						)}
						<Link to="/dashboard" className="btn btn-secondary ml-auto float-right">
							<FaArrowLeft /> Back
						</Link>
					</div>
				</div>
			</form>
		);
	}
}
CategoryForm.propTypes = {
	categories : PropTypes.array.isRequired
	// getAllCategories : PropTypes.func.isRequired,
	// createCategory   : PropTypes.func.isRequired,
	// addService       : PropTypes.func.isRequired
};
CategoryForm.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories
});
export default connect(mapStatetoProps, {})(CategoryForm);
