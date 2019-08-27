import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { getAllCategories, updateCategory, updateService } from '../../../actions/categoryActions';
import CategoryForm from './CategoryForm';

class EditCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		// this.onChange = this.onChange.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
	}

	formSubmit = (e, { id, isService, name, time, parent_category, cost }) => {
		e.preventDefault();
		// const { isService, name, time, parent_category, cost } = this.state;
		// this.setState({ loading: true });
		if (!isService) {
			this.props.updateCategory(id, name);
		} else {
			this.props.updateService({ id, name, time, cost });
		}
	};

	render() {
		const { id, name, parent_category, time, isService, cost } = this.props.location.state;

		return (
			<section className="mt-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">
										new category <span className="text-muted"> AND </span> service
									</h3>
								</div>
								<div className="card-body">
									<CategoryForm
										edit={{ id, name, parent_category, time, isService, cost }}
										formSubmit={this.formSubmit}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

EditCategory.propTypes = {
	categories       : PropTypes.array.isRequired,
	getAllCategories : PropTypes.func.isRequired,
	updateCategory   : PropTypes.func.isRequired,
	updateService    : PropTypes.func.isRequired
};
EditCategory.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories
});
export default connect(mapStatetoProps, { getAllCategories, updateCategory, updateService })(EditCategory);
