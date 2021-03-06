import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { getAllCategories, createCategory, addService } from '../../../actions/categoryActions';
import CategoryForm from './CategoryForm';
// import Swal from 'sweetalert2';

class CreateCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name            : '',
			parent_category : '',
			time            : 10,
			isService       : false,
			loading         : false,
			alert           : '',
			cost            : 0
		};
		// this.onChange = this.onChange.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
	}
	componentDidMount() {}
	// onChange = (e) => {
	// 	const target = e.target;
	// 	var { isService } = this.state;
	// 	if (target.name === 'parent_category') {
	// 		if (!isEmpty(target.value)) {
	// 			isService = true;
	// 		} else {
	// 			isService = false;
	// 		}
	// 	}

	// 	this.setState({ [target.name]: target.value, isService: isService });
	// };

	formSubmit = (e, { isService, name, time, parent_category, cost }) => {
		e.preventDefault();
		// const { isService, name, time, parent_category, cost } = this.state;
		// this.setState({ loading: true });
		if (!isService) {
			this.props.createCategory({ name });
		} else {
			this.props.addService({ parent_category, name, time, cost });
		}
	};

	render() {
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
									<CategoryForm formSubmit={this.formSubmit} />
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
	categories       : PropTypes.array.isRequired,
	getAllCategories : PropTypes.func.isRequired,
	createCategory   : PropTypes.func.isRequired,
	addService       : PropTypes.func.isRequired
};
CreateCategory.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories
});
export default connect(mapStatetoProps, { getAllCategories, createCategory, addService })(CreateCategory);
